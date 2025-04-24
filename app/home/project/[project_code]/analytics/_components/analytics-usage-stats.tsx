'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import type { IAnalyticsUsageStats, IApiRequest, TSummary } from "@/app/home/project/_types"
import { formatResponseTime } from "@/utils/misc/format-response-time";


function processChartData(requests: IApiRequest[]): TSummary[] {
    if (!Array.isArray(requests)) return [];

    const dailyData: Record<string, TSummary> = {};

    for (const request of requests) {
        const dateKey = formatDate(request.created_at);
        const entry = getOrInitSummary(dailyData, dateKey);

        updateSummary(entry, request);
    }

    return sortByDate(Object.values(dailyData));
}

function formatDate(date: string | Date): string {
    return new Date(date).toISOString().split('T')[0];
}

function getOrInitSummary(map: Record<string, TSummary>, date: string): TSummary {

    const entry = map[date] ?? (map[date] = {
        date: date,
        count: 0,
        success: 0,
        error: 0,
        avgResponseTime: 0,
        totalResponseTime: 0,
    });


    return entry;
}

function updateSummary(entry: TSummary, request: IApiRequest): void {
    entry.count++;
    entry.totalResponseTime += request.response_time_ms;
    entry.avgResponseTime = entry.totalResponseTime / entry.count;

    if (request.status_code >= 200 && request.status_code < 300) {
        entry.success++;
    } else {
        entry.error++;
    }
}

function sortByDate(data: TSummary[]): TSummary[] {
    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export default function AnalyticsUsageStats({ requests, className }: IAnalyticsUsageStats) {

    const chartData = processChartData(requests);
    const totalRequests = requests.length;
    const successRate = requests.filter(r => r.status_code >= 200 && r.status_code < 300).length / totalRequests * 100;
    const avgResponseTime = requests.reduce((sum, r) => sum + r.response_time_ms, 0) / totalRequests;

    return (
        <Card className={className}>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 md:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-5 sm:py-4">
                    <CardTitle>API Requests</CardTitle>
                    <CardDescription>
                        Request history for the last {chartData.length} days
                    </CardDescription>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left sm:border-l sm:border-t-0  sm:py-4">
                        <span className="text-xs text-muted-foreground">Total Requests</span>
                        <span className="text-lg font-bold leading-none ">
                            {totalRequests || 0}
                        </span>
                    </div>

                    <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left sm:border-l sm:border-t-0  sm:py-4">
                        <span className="text-xs text-muted-foreground">Success Rate</span>
                        <span className="text-lg font-bold leading-none ">
                            {successRate ? successRate.toFixed(1) : 0}%
                        </span>
                    </div>

                    <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left sm:border-l sm:border-t-0  sm:py-4">
                        <span className="text-xs text-muted-foreground">Avg. Response</span>
                        <span className="text-lg font-bold leading-none ">
                            {formatResponseTime(avgResponseTime || 0)}
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6">
                <div className="w-full h-[300px] sm:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric"
                                    });
                                }}
                            />
                            <YAxis />
                            <Tooltip
                                formatter={(value, name) => {
                                    if (name === 'avgResponseTime') {
                                        return [`${Number(value).toFixed(0)}ms`, "Avg Response Time"];
                                    }
                                    return [value, name === 'count' ? 'Total Requests' : name];
                                }}
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    });
                                }}
                            />
                            <Bar dataKey="count" fill="#8884d8" name="Total Requests" />
                            <Bar dataKey="success" fill="#82ca9d" name="Successful" />
                            <Bar dataKey="error" fill="#ff8042" name="Errors" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

    );
}