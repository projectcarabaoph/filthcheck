import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import { serverClient } from '@/utils/supabase/server-client'
import paths from '@/utils/paths/paths.config'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'

    if (token_hash && type) {
        const supabase = await serverClient()

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            // redirect user to specified redirect URL or root of app
            return NextResponse.redirect(next)
        }
    }

    // redirect user to specified redirect URL (can be error page) or root of app 
    return NextResponse.redirect(paths.app.home)
}