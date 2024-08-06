import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};
