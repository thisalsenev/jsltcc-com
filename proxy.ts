import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!_next|api|opengraph-image|twitter-image|sitemap.xml|robots.txt|.*\\..*).*)"],
};
