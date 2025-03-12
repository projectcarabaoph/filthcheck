import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import paths from '@/utils/paths/paths.config'
import { clientKeys } from '@/utils/supabase/client-keys'

const keys = clientKeys()

export async function serverClient() {
    const { url, anonKey } = keys

    const cookieStore = await cookies()

    const supabase = createServerClient(
        url,
        anonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }
    )
    return supabase
}


export async function middlewareClient(request: NextRequest) {
    const { url, anonKey } = keys


    let response = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        url,
        anonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                }
            }
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl
    const requestUrl = request.nextUrl.clone()

    if (user && !pathname.startsWith(paths.app.home)) {
        requestUrl.pathname = paths.app.home
        return NextResponse.redirect(requestUrl)
    }

    if (!user && pathname.startsWith(paths.app.home)) {
        requestUrl.pathname = paths.auth.signIn
        return NextResponse.redirect(requestUrl)
    }


    return response
}
