'use server'

import { serverClient } from "@/utils/supabase/server-client";

export const updatePassword = async (password: string) => {
    const supabase = await serverClient()
    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) throw new Error(error.message);
    return data
}