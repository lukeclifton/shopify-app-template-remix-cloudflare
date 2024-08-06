import { AppLoadContext } from "@remix-run/cloudflare";
import { type PlatformProxy } from "wrangler";
import { createShopifyAppContext } from "./app/shopify.server";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    shopify: ReturnType<typeof createShopifyAppContext>;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: {
    cloudflare: Cloudflare;
  };
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({context}) => {
  return {
    ...context,
    shopify: createShopifyAppContext(context.cloudflare.env),
  }
}