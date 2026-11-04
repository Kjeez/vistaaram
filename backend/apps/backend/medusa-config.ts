import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const razorpayConfigured = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
const phonepeConfigured = Boolean(process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET)
const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
const gmailConfigured = Boolean(process.env.GMAIL_SERVICE_ACCOUNT_KEY_BASE64 && process.env.GMAIL_SENDER)
const resendConfigured = Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)
// Production sets REDIS_URL; local dev leaves it unset and Medusa uses in-memory fallbacks.
const redisUrl = process.env.REDIS_URL
// S3-compatible storage (Oracle Object Storage in production). Unset = files saved on local disk.
const s3Configured = Boolean(process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY)

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl,
    // "shared" runs API and background jobs in one process, which is right for a single server.
    workerMode: (process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server") || "shared",
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  modules: [
    {
      // Cash on Delivery uses the built-in pp_system_default provider, which is always registered.
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          ...(phonepeConfigured
            ? [
                {
                  resolve: "./src/modules/phonepe",
                  id: "phonepe",
                  options: {
                    client_id: process.env.PHONEPE_CLIENT_ID,
                    client_secret: process.env.PHONEPE_CLIENT_SECRET,
                    client_version: process.env.PHONEPE_CLIENT_VERSION || "1",
                    env: process.env.PHONEPE_ENV === "sandbox" ? "sandbox" : "production",
                    webhook_username: process.env.PHONEPE_WEBHOOK_USERNAME,
                    webhook_password: process.env.PHONEPE_WEBHOOK_PASSWORD,
                  },
                },
              ]
            : []),
          ...(razorpayConfigured
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
            : []),
        ],
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
      // Store emails go out through Google Workspace (Gmail API) when configured, else Resend;
      // with neither, they are only logged (handy in development).
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          gmailConfigured
            ? {
                resolve: "./src/modules/gmail",
                id: "gmail",
                options: {
                  channels: ["email"],
                  service_account_key_base64: process.env.GMAIL_SERVICE_ACCOUNT_KEY_BASE64,
                  sender: process.env.GMAIL_SENDER,
                  sender_name: process.env.GMAIL_SENDER_NAME || "Vistaaram",
                  reply_to: process.env.STORE_EMAIL || process.env.GMAIL_SENDER,
                },
              }
            : resendConfigured
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
    ...(s3Configured
      ? [
          {
            resolve: "@medusajs/medusa/file",
            options: {
              providers: [
                {
                  resolve: "@medusajs/medusa/file-s3",
                  id: "s3",
                  options: {
                    // Public URL prefix for uploaded files, e.g.
                    // https://objectstorage.ap-mumbai-1.oraclecloud.com/n/<namespace>/b/<bucket>/o
                    file_url: process.env.S3_FILE_URL,
                    access_key_id: process.env.S3_ACCESS_KEY_ID,
                    secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
                    region: process.env.S3_REGION,
                    bucket: process.env.S3_BUCKET,
                    // e.g. https://<namespace>.compat.objectstorage.ap-mumbai-1.oraclecloud.com
                    endpoint: process.env.S3_ENDPOINT,
                    prefix: "uploads/",
                    // Oracle's S3 API has no per-object ACLs; the bucket itself is made public.
                    acl: false,
                    additional_client_config: { forcePathStyle: true },
                  },
                },
              ],
            },
          },
        ]
      : process.env.MEDUSA_BACKEND_URL
        ? [
            {
              // No bucket: keep uploads on the server's disk, but link them by the public API address
              // (the default would be http://localhost:9000/static, which browsers can't reach).
              resolve: "@medusajs/medusa/file",
              options: {
                providers: [
                  {
                    resolve: "@medusajs/medusa/file-local",
                    id: "local",
                    options: { backend_url: `${process.env.MEDUSA_BACKEND_URL.replace(/\/$/, "")}/static` },
                  },
                ],
              },
            },
          ]
        : []),
    ...(redisUrl
      ? [
          { resolve: "@medusajs/medusa/cache-redis", options: { redisUrl } },
          { resolve: "@medusajs/medusa/event-bus-redis", options: { redisUrl } },
          { resolve: "@medusajs/medusa/workflow-engine-redis", options: { redis: { redisUrl } } },
          {
            resolve: "@medusajs/medusa/locking",
            options: {
              providers: [
                {
                  resolve: "@medusajs/medusa/locking-redis",
                  id: "locking-redis",
                  is_default: true,
                  options: { redisUrl },
                },
              ],
            },
          },
        ]
      : []),
    { resolve: "./src/modules/wishlist" },
    { resolve: "./src/modules/review" },
  ],
})
