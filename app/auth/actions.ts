"use server"

import { redirect } from 'next/navigation'
import { serverClient } from '@/utils/supabase/server-client'
import paths from '@/utils/paths/paths.config'
import { clientKeys } from '@/utils/supabase/client-keys'

export const signInWithOAuth = async (provider: "google") => {
    const supabase = await serverClient()
    const keys = clientKeys()

    const response = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${keys.devBaseURL}${paths.auth.callback}`
        }
    })

    const { url } = response.data
    if (url) redirect(url)
    throw response.error
}

export const signOut = async () => {
    const supabase = await serverClient();
    await supabase.auth.signOut();

    redirect("/");
};