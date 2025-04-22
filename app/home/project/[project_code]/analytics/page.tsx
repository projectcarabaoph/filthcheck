import AnalyticsUsageStats from "@/app/home/project/[project_code]/analytics/_components/analytics-usage-stats"

const Analytics = () => {
    return (
        <div className=" flex flex-col items-center  gap-2 ">
            <div className="max-w-7xl w-full p-4 flex flex-col">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        Usage Overview
                    </h1>
                    <span className="text-sm">iew your recent request activity below.</span>
                </div>
                <div className="flex flex-col gap-2 py-2">
                    <AnalyticsUsageStats />
                </div>
            </div>
        </div>

    )
}

export default Analytics