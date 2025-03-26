import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import paths from "@/utils/paths/paths.config";
import { serverClient } from "@/utils/supabase/server-client";
import { clientKeys } from "@/utils/supabase/client-keys";

export async function GET(request: NextRequest) {
    const keys = clientKeys()
    const requestUrl = new URL(request.url)

    const project_code = requestUrl.searchParams.get("project_code")

    if (project_code) {
        const supabase = await serverClient()
        await supabase.auth.exchangeCodeForSession(project_code)
    }
    return NextResponse.redirect(
        new URL(paths.app.home, keys.devBaseURL)
    )
}