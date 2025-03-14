import Link from "next/link"
import { Plus } from 'lucide-react'

import type { TAppCard } from "@/app/home/(dashboard)/_types"
import paths from "@/utils/paths/paths.config"

import ListComponent from "@/components/shared/list-component"
import AppCard from "@/app/home/(dashboard)/_components/app-card"

import { serverClient } from "@/utils/supabase/server-client"
import { toast } from "sonner"

const Dashboard = async () => {

    const supabase = await serverClient()

    const { data: projectData, error } = await supabase
        .from('projects')
        .select(`*`);

    if (error) toast.error(error.message)

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-7xl">
                <div className="flex flex-row justify-between gap-2">
                    <h1 className="text-lg font-bold text-gray-900 ">
                        Apps
                    </h1>
                    <Link href={paths.app.newProject} className="bg-custome-pink justify-center text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors">
                        <Plus className="h-5 w-5" /> Create New App
                    </Link>
                </div>

                <ListComponent
                    data={[]}
                    className="flex flex-col gap-2"
                    renderItem={(data: TAppCard) => (
                        <Link
                            key={data.title}
                            href={'#'}
                            className={`py-2 px-2 font-medium w-full`}
                        >
                            <AppCard title={data.title} description={data.description} />
                        </Link>
                    )}
                />
            </div>
        </div>
    )
}

export default Dashboard