"use server"

import { redirect } from 'next/navigation'
import { serverClient } from '@/utils/supabase/server-client'
import paths from '@/utils/paths/paths.config'
import { clientKeys } from '@/utils/supabase/client-keys'
import type { TSignInWithPassword, TSignUpWithPassword } from '@/app/auth/_types'

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

export const signUpWithPassword = async ({ email, password, fullname }: TSignUpWithPassword) => {
    const supabase = await serverClient()
    const keys = clientKeys()

    const { data: userExist, error: userError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single();

    if (userError && userError.code !== "PGRST116") throw new Error(userError.message);

    if (userExist) throw new Error('User already exists');

    const { data: { user }, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: fullname,
            },
            emailRedirectTo: `${keys.devBaseURL}${paths.auth.callback}`
        },
    })

    if (error) throw new Error(error.message);
    return user;
}

export const signInWithPassword = async ({ email, password }: TSignInWithPassword) => {
    const supabase = await serverClient()
    const { data: { user }, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(error.message);
    return user;
}

export const forgotPassword = async (email: string) => {
    const supabase = await serverClient()
    const keys = clientKeys()
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${keys.devBaseURL}${paths.app.updatePassword}`
    })
    if (error) throw new Error(error.message);
    return data
}

export const signOut = async () => {
    const supabase = await serverClient();
    await supabase.auth.signOut();

    redirect("/");
};