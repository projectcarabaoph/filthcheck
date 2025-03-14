'use client'
import Link from "next/link";
import { Settings } from "lucide-react";

import type { TAppCard } from "@/app/home/(dashboard)/_types";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function AppCard({ data }: { data: TAppCard }) {

    const { title, description, plan, pattern } = data

    return (
        <Card className="w-full shadow-card overflow-hidden relative transition-all duration-300 hover:bg-slate-50">
            <div style={{ backgroundImage: pattern }} className="w-full h-full min-h-24 max-h-24">
            </div>
            <CardHeader className="pb-2 ">
                <div className="flex flex-row justify-between items-center gap-2">
                    <CardTitle className="text-lg font-medium">{title}</CardTitle>
                    <Link href={'#'}>
                        <Settings className="w-4 h-4 text-slate-500 hover:text-slate-700" />
                    </Link>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <div className="flex flex-col">
                        <p className="capitalize w-12 bg-indigo-100 text-custome-pink text-center p-1 rounded-md">{plan}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
