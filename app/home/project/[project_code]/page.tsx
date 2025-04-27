import { notFound } from "next/navigation";

import { serverClient } from "@/utils/supabase/server-client";

import type { IApiRequest, IProject, TApiKeys } from "@/app/home/project/_types";

import ApiKeyCard from "@/app/home/project/[project_code]/_components/api-key-card";
import TestApiCard from "@/app/home/project/[project_code]/_components/test-api-card";
import AllowedDomainsCard from "@/app/home/project/[project_code]/_components/allowed-domains-card";

const Project = async (props: { params: IProject }) => {

    const { project_code } = await props.params;


    const supabase = await serverClient()

    let projectQuery = supabase
        .from('projects')
        .select('project_code')


    if (project_code) {
        projectQuery = projectQuery.eq('project_code', project_code);
    }

    const { data: projectData, error: projectError } = await projectQuery.single<IApiRequest>();

    if (!project_code || projectError) notFound()


    let apiKeyQuery = supabase
        .from('api_keys')
        .select('*')

    if (projectData.project_code) {
        apiKeyQuery = apiKeyQuery.eq('project_code', projectData.project_code);
    }

    const { data: apiKeyData, error: apieKeyError } = await apiKeyQuery.single<TApiKeys>();

    const { api_key, project_id, domains } = apiKeyData as TApiKeys

    if (!projectData.project_code || apieKeyError) notFound()


    const domainList = domains ? domains.split(',') : []

    return (
        <div className=" flex flex-col items-center  gap-2 ">
            <div className="max-w-7xl w-full p-4 flex flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        API Keys
                    </h1>
                    <span className="text-sm">Manage your api key information</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                    <ApiKeyCard apiKey={api_key} />
                    <AllowedDomainsCard domains={domainList} project_id={project_id} />
                    <TestApiCard apiKey={api_key} />
                </div>
            </div>
        </div>
    );
}

export default Project