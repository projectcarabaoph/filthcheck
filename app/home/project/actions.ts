'use server'

import { revalidatePath } from "next/cache"

import { serverClient } from "@/utils/supabase/server-client"
import paths from "@/utils/paths/paths.config"
import { generateRandomPattern } from "@/utils/misc/generate-random-pattern"
import { generateApiToken } from "@/utils/misc/generate-api-token"

import type { TNewProjectSchema } from "@/app/home/project/new/_components/create-new-project-form"
import { parseDomainLinks } from "@/utils/misc/parse-domain-links"

export const createNewProject = async (formData: TNewProjectSchema) => {

    const supabase = await serverClient()
    const pattern = generateRandomPattern()

    const { data: { user } } = await supabase.auth.getUser()

    const generatedApiToken = generateApiToken({
        id: user?.id as string,
        email: user?.email as string
    })

    if (!generatedApiToken) throw new Error('Failed to generate API token')

    const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
            title: formData.title.trim(),
            description: formData.description.trim(),
            pattern: pattern
        }).select('*').single()

    if (projectError) throw new Error(projectError.message)

    const { data: apiData, error: apiError } = await supabase
        .from('api_keys')
        .insert({
            project_id: projectData?.project_id,
            project_code: projectData?.project_code,
            api_key: generatedApiToken,

        })

    if (apiError) throw new Error(apiError.message)


    revalidatePath(paths.app.home)
    return apiData

}


export const updateAllowedDomains = async (formData: FormData) => {

    const domains = parseDomainLinks(formData.get('domains') as string)
    const project_id = formData.get('project_id') as string

    const supabase = await serverClient()

    const { data: domainData, error: domainError } = await supabase
        .from('api_keys')
        .update({
            domains: domains.join(',')
        })
        .eq('project_id', project_id)

    if (domainError) throw new Error(domainError.message)

    revalidatePath(paths.app.home)
    return domainData
}