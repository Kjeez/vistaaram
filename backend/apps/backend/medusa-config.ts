import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const razorpayConfigured = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
const resendConfigured = Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      // Cash on Delivery uses the built-in pp_system_default provider, which is always registered.
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: razorpayConfigured
          ? [
              {
                resolve: "./src/modules/razorpay",
                id: "razorpay",
                options: {
                  key_id: process.env.RAZORPAY_KEY_ID,
                  key_secret: process.env.RAZORPAY_KEY_SECRET,
                  webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET,
                },
              },
            ]
          : [],
      },
    },
    {
      // Listing providers replaces the defaults, so emailpass (also used by admin users) is kept explicitly.
      resolve: "@medusajs/medusa/auth",
      dependencies: ["cache", "logger"],
      options: {
        providers: [
          { resolve: "@medusajs/medusa/auth-emailpass", id: "emailpass" },
          ...(googleConfigured
            ? [
                {
                  resolve: "@medusajs/medusa/auth-google",
                  id: "google",
                  options: {
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackUrl: `${process.env.STOREFRONT_URL}/auth/google/callback`,
                  },
                },
              ]
            : []),
        ],
      },
    },
    {
      // Without Resend credentials, emails are only logged (handy in development).
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          resendConfigured
            ? {
                resolve: "./src/modules/resend",
                id: "resend",
                options: {
                  channels: ["email"],
                  api_key: process.env.RESEND_API_KEY,
                  from: process.env.EMAIL_FROM,
                },
              }
            : {
                resolve: "@medusajs/medusa/notification-local",
                id: "local",
                options: { channels: ["email"] },
              },
        ],
      },
    },
    { resolve: "./src/modules/wishlist" },
    { resolve: "./src/modules/review" },
  ],
})
