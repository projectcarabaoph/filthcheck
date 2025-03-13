'use client'

import type { TAppCard } from "@/app/home/(dashboard)/_types";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function AppCard({ title, description }: TAppCard) {
    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:bg-slate-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">

                </div>
            </CardContent>
        </Card>
    )
}
