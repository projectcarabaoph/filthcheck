import AnalyticsUsageStats from "@/app/home/project/[project_code]/analytics/_components/analytics-usage-stats"
import AnalyticsRequestTable from "@/app/home/project/[project_code]/analytics/_components/analytics-request-table"

import type { IAnalytics, IApiRequest } from "@/app/home/project/_types";
import { serverClient } from "@/utils/supabase/server-client";
import { notFound } from "next/navigation";



const Analytics = async (props: { params: IAnalytics }) => {

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

    let analyticsQuery = supabase
        .from('analytics')
        .select('*')


    if (projectData.project_code) {
        analyticsQuery = analyticsQuery.eq('project_code', projectData.project_code);
    }

    const { data: analyticData, error: analyticError } = await analyticsQuery;


    if (!projectData.project_code || analyticError) notFound()

    return (
        <div className=" flex flex-col items-center  gap-2 ">
            <div className="max-w-7xl w-full p-4 flex flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        Usage Overview
                    </h1>
                    <span className="text-sm">View your recent request activity below.</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                    <AnalyticsUsageStats requests={analyticData as IApiRequest[]} />
                    <AnalyticsRequestTable
                        requests={analyticData as IApiRequest[]}
                        pageSize={5}
                        caption="Recent API requests"
                    />
                </div>
            </div>
        </div>

    )
}

export default Analytics