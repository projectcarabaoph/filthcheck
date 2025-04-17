'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Settings } from "lucide-react";

import type { TAppCard } from "@/app/home/(dashboard)/_types";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { replacePlaceholders } from '@/utils/misc/replace-placeholder';
import paths from '@/utils/paths/paths.config';

export default function AppCard({ data }: { data: TAppCard }) {

    const { title, description, plan, pattern, project_code } = data

    const router = useRouter()

    const handleOnClick = (url: string) => {
        router.push(url)
    }

    const newUrl = replacePlaceholders(paths.app.project, { project_code })

    return (
        <Link key={data.title} href={newUrl}>
            <Card className="w-full h-full shadow-card hover:shadow-sm overflow-hidden relative transition-all duration-300 group hover:border-indigo-100 hover:border">
                <div className="relative">
                    <div
                        style={{ backgroundImage: pattern }}
                        className="w-full h-24 bg-cover bg-center"
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/5 group-hover:from-black/20 group-hover:to-black/10 transition-all duration-300"></div>
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
                            <CardDescription className="mt-1 line-clamp-2 text-sm">{description}</CardDescription>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                handleOnClick('#')
                            }}
                        >
                            <Settings className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="px-4 pb-4 pt-0">
                    <div className="flex justify-between items-center">
                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${plan === 'pro'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                            }`}>
                            {plan.toUpperCase()}
                        </span>


                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
