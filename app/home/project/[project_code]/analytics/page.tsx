import AnalyticsUsageStats from "@/app/home/project/[project_code]/analytics/_components/analytics-usage-stats"
import AnalyticsRequestTable from "@/app/home/project/[project_code]/analytics/_components/analytics-request-table"

import type { IAnalytics, IApiRequest } from "@/app/home/project/_types";
import { serverClient } from "@/utils/supabase/server-client";


const Analytics = async ({ params }: IAnalytics) => {

    const { project_code } = await params;

    const supabase = await serverClient()

    const { data } = await supabase
        .from('analytics')
        .select('*')
        .eq('project_code', project_code)

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
                    <AnalyticsUsageStats requests={data as IApiRequest[]} />
                    <AnalyticsRequestTable
                        requests={data as IApiRequest[]}
                        pageSize={5}
                        caption="Recent API requests"
                    />
                </div>
            </div>
        </div>

    )
}

export default Analytics