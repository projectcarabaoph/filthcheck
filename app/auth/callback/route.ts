import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import pathsConfig from "@/utils/paths/paths.config";
import { serverClient } from "@/utils/supabase/server-client";
import { clientKeys } from "@/utils/supabase/client-keys";

export async function GET(request: NextRequest) {
    const keys = clientKeys()
    const requestUrl = new URL(request.url)

    const code = requestUrl.searchParams.get("code")

    if (code) {
        const supabase = await serverClient()
        await supabase.auth.exchangeCodeForSession(code)
    }
    return NextResponse.redirect(
        new URL(pathsConfig.app.home, keys.devBaseURL)
    )
}