import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import {KVSessionStorage} from '@shopify/shopify-app-session-storage-kv';
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";

export function createShopifyAppContext(env: Env) {
  return shopifyApp({
    apiKey: env.SHOPIFY_API_KEY,
    apiSecretKey: env.SHOPIFY_API_SECRET || "",
    apiVersion: ApiVersion.July24,
    scopes: env.SCOPES?.split(","),
    appUrl: env.SHOPIFY_APP_URL || "",
    authPathPrefix: "/auth",
    sessionStorage: new KVSessionStorage(env.SHOPIFY_SESSIONS),
    distribution: AppDistribution.AppStore,
    restResources,
    future: {
      unstable_newEmbeddedAuthStrategy: true,
    },
    ...(env.SHOP_CUSTOM_DOMAIN
      ? { customShopDomains: [env.SHOP_CUSTOM_DOMAIN] }
      : {}),
  });
}