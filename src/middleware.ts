import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

export default clerkMiddleware();
// Initialize the createMiddleware with its configuration
// export const intlMiddleware = createMiddleware({
//   locales: ["en", "fr"],
//   defaultLocale: "fr",
// });

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // General matching for all pages except static files and _next
    "/", // Match the root
    "/(api|trpc)(.*)", // Match API and TRPC routes
    "/mentor/create/:id*", // Match the dynamic route for mentor creation with an ID
    "/:locale(fr|en)?/:path*", // Match internationalized pathnames, where :locale can be 'fr' or 'en'
  ],
};
