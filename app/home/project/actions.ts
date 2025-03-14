'use server'

import { revalidatePath } from "next/cache"
import { serverClient } from "@/utils/supabase/server-client"
import type { TNewProjectSchema } from "./new/create-new-project-form"
import paths from "@/utils/paths/paths.config"

export const createNewProject = async (formData: TNewProjectSchema) => {

    const supabase = await serverClient()

    const { data, error } = await supabase.from('projects').insert(formData)

    if (error) throw new Error(error.message)

    revalidatePath(paths.app.home)
    return data

}
