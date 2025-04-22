import AnalyticsUsageStats from "@/app/home/project/[project_code]/analytics/_components/analytics-usage-stats"
import AnalyticsRequestTable from "@/app/home/project/[project_code]/analytics/_components/analytics-request-table"

import type { IApiRequest } from "@/app/home/project/_types";

// Mock data for the API requests
const generateMockApiRequests = (count: number): IApiRequest[] => {
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;
    const endpoints = [
        "/",
        "/api/products",
        "/api/orders",
        "/api/auth/login",
        "/api/auth/register",
        "/api/payments",
        "/api/analytics",
        "/api/settings",
    ];

    return Array.from({ length: count }).map((_, index) => {
        const method = methods[Math.floor(Math.random() * methods.length)];
        const statusBase = method === "GET" ? 200 :
            method === "POST" ? (Math.random() > 0.7 ? 400 : 201) :
                method === "DELETE" ? (Math.random() > 0.9 ? 404 : 204) :
                    Math.random() > 0.8 ? 400 : 200;

        return {
            id: `${Math.random().toString(36).substring(2, 10)}${index}`,
            project_id: `${Math.random().toString(36).substring(2, 10)}${index}`,
            path: endpoints[Math.floor(Math.random() * endpoints.length)],
            method,
            status_code: statusBase + Math.floor(Math.random() * 5),
            response_time_ms: Math.floor(Math.random() * 1000) + 50,
            ip_address: Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.'),
            created_at: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
        };
    });
};

const mockApiRequests = generateMockApiRequests(35);

const Analytics = () => {
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
                    <AnalyticsUsageStats />
                    <AnalyticsRequestTable
                        requests={mockApiRequests}
                        pageSize={8}
                        caption="Recent API requests from the last 7 days"
                    />
                </div>
            </div>
        </div>

    )
}

export default Analytics