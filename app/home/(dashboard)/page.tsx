import Link from "next/link"
import { Plus } from 'lucide-react'
import { toast } from "sonner"

import type { TAppCard } from "@/app/home/(dashboard)/_types"
import paths from "@/utils/paths/paths.config"

import ListComponent from "@/components/shared/list-component"
import AppCard from "@/app/home/(dashboard)/_components/app-card"

import { serverClient } from "@/utils/supabase/server-client"
import EmptyComponent from "@/components/shared/empty-component"

const Dashboard = async () => {

    const supabase = await serverClient()

    const { data: projectData, error } = await supabase
        .from('projects')
        .select(`*`);

    if (error) toast.error(error.message)

    const isProjectData = projectData && projectData.length > 0

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-7xl">
                <div className="flex flex-row justify-between items-center gap-2">
                    <h1 className="text-lg font-bold text-gray-900 ">
                        Apps
                    </h1>
                    <Link
                        href={paths.app.newProject}
                        className={`${isProjectData ? 'bg-gray-300 pointer-events-none' : 'bg-custome-pink hover:bg-custome-pink/90 '} justify-center text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors`}>
                        <Plus className="h-5 w-5" />
                        <span>Create New App</span>
                    </Link>
                </div>
                {isProjectData ?
                    (
                        <ListComponent
                            data={projectData as TAppCard[]}
                            className="grid sm:grid-cols-[repeat(auto-fit,minmax(280px,max-content))] gap-2 "
                            renderItem={(data: TAppCard) => (
                                <AppCard data={data} />
                            )}
                        />
                    ) : (
                        <EmptyComponent />
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard