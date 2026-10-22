import { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  MedusaError,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createInventoryLevelsWorkflow,
  createProductOptionsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createShippingOptionsWorkflow,
  createTaxRegionsWorkflow,
  updateStoresWorkflow,
  createPromotionsWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function seedVistaaram({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(ModuleRegistrationName.FULFILLMENT);

  logger.info("🌿 Starting Vistaaram Sambrani Product & Store Seeding...");

  // 1. Get Default Store and ensure INR currency is supported
  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "name", "supported_currencies.*", "default_sales_channel_id"],
  });
  const store = stores[0];

  const hasInr = store?.supported_currencies?.some((c: any) => c.currency_code === "inr");
  if (!hasInr && store) {
    logger.info("Adding INR to supported currencies...");
    const currentCurrencies = store.supported_currencies || [];
    await updateStoresWorkflow(container).run({
      input: {
        selector: { id: store.id },
        update: {
          supported_currencies: [
            ...currentCurrencies.map((c: any) => ({
              currency_code: c.currency_code,
              is_default: c.is_default,
            })),
            {
              currency_code: "inr",
              is_default: false,
            },
          ],
        },
      },
    });
  }

  // 2. Fetch or Create India Region
  const { data: existingRegions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code", "countries.*"],
  });

  const existingIndia = existingRegions.find((r: any) => r.currency_code === "inr" || r.name.toLowerCase() === "india");
  let indiaRegion: { id: string } | undefined = existingIndia;
  if (!indiaRegion) {
    logger.info("Creating India Region (INR)...");
    const { result: createdRegions } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "India",
            currency_code: "inr",
            countries: ["in"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    indiaRegion = createdRegions[0];
  } else {
    logger.info(`Found existing India Region: ${indiaRegion.id}`);
  }
  if (!indiaRegion) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Could not create or find the India region.");
  }
  const indiaRegionId = indiaRegion.id;

  // 3. Tax Region for India
  const { data: existingTaxRegions } = await query.graph({
    entity: "tax_region",
    fields: ["id", "country_code"],
  });
  const hasIndiaTax = existingTaxRegions.some((tr: any) => tr.country_code === "in");
  if (!hasIndiaTax) {
    logger.info("Creating India Tax Region...");
    await createTaxRegionsWorkflow(container).run({
      input: [
        {
          country_code: "in",
          provider_id: "tp_system",
        },
      ],
    });
  }

  // 4. Fulfillment Set & Shipping Options for India
  const { data: stockLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  });
  const stockLocation = stockLocations[0];

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfiles[0];

  const { data: existingShippingOptions } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name", "prices.*"],
  });

  const hasIndiaShipping = existingShippingOptions.some((so: any) =>
    so.prices?.some((p: any) => p.currency_code === "inr")
  );

  if (!hasIndiaShipping && stockLocation && shippingProfile) {
    logger.info("Creating Fulfillment service zone & Shipping Options for India...");
    const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: "India Domestic Delivery",
      type: "shipping",
      service_zones: [
        {
          name: "India All States",
          geo_zones: [
            {
              country_code: "in",
              type: "country",
            },
          ],
        },
      ],
    });

    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_set_id: fulfillmentSet.id,
      },
    });

    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Standard Delivery (India)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Standard",
            description: "Delivery across India in 3-5 days.",
            code: "standard_in",
          },
          prices: [
            {
              currency_code: "inr",
              amount: 49,
            },
            {
              region_id: indiaRegionId,
              amount: 49,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
        {
          name: "Free Express Shipping (Orders above ₹499)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Free Delivery",
            description: "Free fast shipping for qualifying orders.",
            code: "free_shipping_in",
          },
          prices: [
            {
              currency_code: "inr",
              amount: 0,
            },
            {
              region_id: indiaRegionId,
              amount: 0,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
      ],
    });
  }

  // 5. Sales Channel
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  });
  const salesChannel = salesChannels[0];

  // 6. Check if Vistaaram Product already exists
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "title"],
  });

  const existingSambrani = existingProducts.find((p: any) => p.handle === "sambrani-cup");

  if (!existingSambrani) {
    logger.info("Creating Natural Sambrani Hawan Cup product with 3 bundle variants...");

    const { result: optionsResult } = await createProductOptionsWorkflow(container).run({
      input: {
        product_options: [
          {
            title: "Pack Size",
            values: ["1 Box (12 Cups)", "2 Boxes (24 Cups)", "4 Boxes (48 Cups)"],
          },
        ],
      },
    });
    const packOption = optionsResult[0];

    const { result: productResult } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "Natural Sambrani Hawan Cup",
            subtitle: "Sacred Fragrance for Your Daily Rituals",
            description:
              "Handcrafted in Devbhoomi Uttarakhand using temple flowers, cow dung, and natural herbs. Each cup burns for 20-25 minutes, releasing a divine fragrance that purifies your home and elevates your spiritual practice. Completely free from charcoal, chemicals, and synthetic additives.",
            handle: "sambrani-cup",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile?.id,
            thumbnail: "http://localhost:3000/images/product/1.jpg",
            images: [
              { url: "http://localhost:3000/images/product/1.jpg" },
              { url: "http://localhost:3000/images/product/2.jpg" },
              { url: "http://localhost:3000/images/product/3.jpg" },
              { url: "http://localhost:3000/images/product/4.jpg" },
              { url: "http://localhost:3000/images/product/5.jpg" },
            ],
            options: [{ id: packOption.id }],
            variants: [
              {
                title: "1 Box (12 Cups)",
                sku: "VIST-SAMB-1",
                options: {
                  "Pack Size": "1 Box (12 Cups)",
                },
                prices: [
                  {
                    amount: 279,
                    currency_code: "inr",
                  },
                ],
              },
              {
                title: "2 Boxes (24 Cups) — Save 10%",
                sku: "VIST-SAMB-2",
                options: {
                  "Pack Size": "2 Boxes (24 Cups)",
                },
                prices: [
                  {
                    amount: 502,
                    currency_code: "inr",
                  },
                ],
              },
              {
                title: "4 Boxes (48 Cups) — Save 15%",
                sku: "VIST-SAMB-4",
                options: {
                  "Pack Size": "4 Boxes (48 Cups)",
                },
                prices: [
                  {
                    amount: 948,
                    currency_code: "inr",
                  },
                ],
              },
            ],
            sales_channels: salesChannel ? [{ id: salesChannel.id }] : [],
          },
        ],
      },
    });

    logger.info(`✅ Created Product: ${productResult[0].title} (ID: ${productResult[0].id})`);

    // Assign inventory to all new variants
    const { data: inventoryItems } = await query.graph({
      entity: "inventory_item",
      fields: ["id", "sku"],
    });

    const vistaaramInventory = inventoryItems.filter((i: any) => i.sku?.startsWith("VIST-SAMB"));
    if (vistaaramInventory.length > 0 && stockLocation) {
      await createInventoryLevelsWorkflow(container).run({
        input: {
          inventory_levels: vistaaramInventory.map((item: any) => ({
            location_id: stockLocation.id,
            stocked_quantity: 500,
            inventory_item_id: item.id,
          })),
        },
      });
      logger.info(`Stocked 500 units for each Vistaaram variant at location ${stockLocation.name}`);
    }
  } else {
    logger.info(`Natural Sambrani Hawan Cup product already exists: ${existingSambrani.id}`);
  }

  // 7. Seed WELCOME8 Promotion (8% off above ₹999)
  const { data: existingPromotions } = await query.graph({
    entity: "promotion",
    fields: ["id", "code"],
  });

  const hasWelcome8 = existingPromotions.some((p: any) => p.code === "WELCOME8");
  if (!hasWelcome8) {
    try {
      logger.info("Creating WELCOME8 promotion (8% discount)...");
      await createPromotionsWorkflow(container).run({
        input: {
          promotionsData: [
            {
              code: "WELCOME8",
              type: "standard",
              status: "active",
              application_method: {
                type: "percentage",
                target_type: "items",
                allocation: "across",
                value: 8,
                currency_code: "inr",
              },
            },
          ],
        },
      });
      logger.info("✅ Created WELCOME8 promotion!");
    } catch (err: any) {
      logger.warn(`Could not create WELCOME8 promotion: ${err.message}`);
    }
  } else {
    logger.info("WELCOME8 promotion already exists.");
  }

  logger.info("🎉 Vistaaram seeding completed successfully!");
}
