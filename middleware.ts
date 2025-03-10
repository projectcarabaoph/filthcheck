import type { NextRequest } from "next/server";
import { middlewareClient } from "@/utils/supabase/server-client";

export const config = {
    matcher: [
        /*
             * Match all request paths except for the ones starting with:
             * - _next/static (static files)
             * - _next/image (image optimization files)
             * - favicon.ico (favicon file)
             * Feel free to modify this pattern to include more paths.
             */
        "/((?!_next/static|_next/image|favicon.ico).*)",
        "/auth/:path*",
    ],
}


export async function middleware(request: NextRequest) {
    return await middlewareClient(request)
}