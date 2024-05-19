import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",  // General matching for all pages except static files and _next
    "/",                       // Match the root
    "/(api|trpc)(.*)",         // Match API and TRPC routes
    "/mentor/create/:id*"      // Match the dynamic route for mentor creation with an ID
  ],
};