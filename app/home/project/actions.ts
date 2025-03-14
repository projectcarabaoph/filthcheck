'use server'

import { revalidatePath } from "next/cache"
import { serverClient } from "@/utils/supabase/server-client"
import type { TNewProjectSchema } from "./new/create-new-project-form"
import paths from "@/utils/paths/paths.config"
import { generateRandomPattern } from "@/utils/misc/generate-random-pattern"

export const createNewProject = async (formData: TNewProjectSchema) => {

    const supabase = await serverClient()
    const pattern = generateRandomPattern()

    const { data, error } = await supabase
        .from('projects')
        .insert({
            title: formData.title.trim(),
            description: formData.description.trim(),
            pattern: pattern
        })

    if (error) throw new Error(error.message)

    revalidatePath(paths.app.home)
    return data

}
