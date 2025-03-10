import { NextResponse } from 'next/server'
import type { EmailOtpType } from '@supabase/supabase-js'
import type { NextRequest } from 'next/server'
import { serverClient } from '@/utils/supabase/server-client'

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

    // redirect the user to an error page with some instructions
    return NextResponse.redirect('/')
}