import { notFound } from "next/navigation";

import { serverClient } from "@/utils/supabase/server-client";

import type { IProject, TApiKeys } from "@/app/home/project/_types";

import ApiKeyCard from "@/app/home/project/[project_code]/_components/api-key-card";
import TestApiCard from "@/app/home/project/[project_code]/_components/test-api-card";
import AllowedDomainsCard from "@/app/home/project/[project_code]/_components/allowed-domains-card";

const Project = async ({ params }: IProject) => {
    const { project_code } = await params;

    if (!project_code) return notFound();

    const supabase = await serverClient()

    const { data } = await supabase
        .from('api_keys')
        .select('*')
        .eq('project_code', project_code)
        .single<TApiKeys>()

    const domains = data?.domains ? data.domains.split(',') : []

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
                    <ApiKeyCard apiKey={data?.api_key} />
                    <AllowedDomainsCard domains={domains} project_id={data?.project_id} />
                    <TestApiCard apiKey={data?.api_key} />
                </div>
            </div>
        </div>


    );
}

export default Project