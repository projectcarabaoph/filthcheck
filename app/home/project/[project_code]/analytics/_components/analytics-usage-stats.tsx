'use client'

import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TooltipProps } from 'recharts';

import { cn } from "@/lib/utils";


const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-2 shadow-lg border border-border/40 text-sm">
                <p className="font-medium">{label}</p>
                <p className="text-primary font-medium">
                    {`${(payload[0].value as number).toLocaleString()} requests`}
                </p>
            </div>
        );
    }

    return null;
};

type TimeRange = "7d" | "14d" | "30d";

interface TUsageStats {
    className?: string;
}

export default function AnalyticsUsageStats({ className }: TUsageStats) {
    const [timeRange, setTimeRange] = useState<TimeRange>("7d");
    const [isIncreasing, setIsIncreasing] = useState<boolean>(false)
    const [data, setData] = useState<{ date: string; requests: number }[]>([]);


    const handleRangeChange = (range: TimeRange) => {
        setTimeRange(range);
    };

    useEffect(() => {
        const generateData = (days: number) => {
            const d = [];
            for (let i = 0; i < days; i++) {
                const date = new Date();
                date.setDate(date.getDate() - (days - 1 - i));
                d.push({
                    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                    requests: Math.floor(Math.random() * 500) + 500,
                });
            }
            return d;
        };

        const days = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : 30;
        setData(generateData(days));
        setIsIncreasing(true)
    }, [timeRange]);

    const totalRequests = data.reduce((sum, item) => sum + item.requests, 0);
    const percentChange = 10;

    return (
        <Card className={cn("glass-card shadow-card  overflow-hidden", className)}>
            <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row gap-8 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div>
                            <CardTitle className="text-lg font-medium text-center sm:text-left">API Usage</CardTitle>
                            <CardDescription>Requests over time</CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center text-sm font-medium">
                        <button
                            className={cn(
                                "px-2 py-1 rounded transition-colors",
                                timeRange === "7d" ? "bg-custome-pink text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => handleRangeChange("7d")}
                        >
                            7D
                        </button>
                        <button
                            className={cn(
                                "px-2 py-1 rounded transition-colors",
                                timeRange === "14d" ? "bg-custome-pink text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => handleRangeChange("14d")}
                        >
                            14D
                        </button>
                        <button
                            className={cn(
                                "px-2 py-1 rounded transition-colors",
                                timeRange === "30d" ? "bg-custome-pink text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => handleRangeChange("30d")}
                        >
                            30D
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 pb-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                    <div className="bg-background/50 rounded-lg border border-border/30 p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                            <Icon icon="" className="h-4 w-4 text-custome-pink" />
                        </div>
                        <div className="mt-1 flex items-baseline justify-between">
                            <h4 className="text-2xl font-semibold">{totalRequests.toString()}</h4>
                            <span className={cn(
                                "flex items-center text-xs font-medium",
                                isIncreasing ? "text-green-600" : "text-red-600"
                            )}>
                                {isIncreasing ? (
                                    <Icon icon="ri:arrow-right-up-line" className="mr-1 h-3 w-3 " />
                                ) : (
                                    <Icon icon="ri:arrow-right-down-line" className="mr-1 h-3 w-3 " />
                                )}
                                {Math.abs(percentChange)}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                        >
                            <defs>
                                <linearGradient x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="black" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="black" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12 }}
                                width={40}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="requests"
                                stroke="#FF4E88"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6, stroke: "#FF4E88", strokeWidth: 2 }}
                                fillOpacity={1}
                                fill="#000"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};


