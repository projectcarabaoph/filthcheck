import { notFound } from "next/navigation";
import { toast } from "sonner";

import type { IProject, TApiKeys } from "@/app/home/project/_types";
import { serverClient } from "@/utils/supabase/server-client";

import ApiKeyCard from "@/app/home/project/[code]/_components/api-key-card";
import TestApiCard from "@/app/home/project/[code]/_components/test-api-card";


const Project = async ({ params }: IProject) => {
    const { code } = params;

    if (!code) return notFound();

    const supabase = await serverClient()

    const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('project_code', code)
        .single<TApiKeys>()

    if (error) toast.error(error.message)

    return (
        <div className=" flex flex-col items-center  gap-2 ">
            <div className="max-w-7xl w-full p-4 flex flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        API Keys
                    </h1>
                    <span className="text-sm">Manage your api key information</span>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <ApiKeyCard apiKey={data?.api_key} />
                    <TestApiCard />
                </div>
            </div>
        </div>


    );
}

export default Project