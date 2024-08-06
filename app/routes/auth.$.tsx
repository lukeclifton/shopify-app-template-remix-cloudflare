import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await context.shopify.authenticate.admin(request);

  return null;
};
