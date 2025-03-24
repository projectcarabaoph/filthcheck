import { notFound } from "next/navigation";
import type { IProject } from "@/app/home/project/_types";
import { serverClient } from "@/utils/supabase/server-client";
import { toast } from "sonner";


const Project = async ({ params }: IProject) => {
    const { code } = params;

    if (!code) return notFound();

    const supabase = await serverClient()

    const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('project_code', code)
        .single()

    if (error) toast.error(error.message)

    console.log(data)


    return (
        <div className=" flex flex-col items-center  gap-2 ">
            <div className="max-w-7xl w-full p-4 flex flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        API Keys
                    </h1>
                    <span className="text-sm">Your API is secured behind an API gateway which requires an API Key for every request.</span>
                </div>
                <div className="flex flex-col gap-2 p-2">

                </div>
            </div>
        </div>


    );
}

export default Project