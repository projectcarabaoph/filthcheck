import Link from "next/link"
import { Plus } from 'lucide-react'
const Dashboard = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-7xl">
                <div className="flex flex-row justify-between gap-2">
                    <h1 className="text-lg font-bold text-gray-900 ">
                        Apps
                    </h1>
                    <Link href='#project/new' className="bg-custome-pink justify-center text-white px-8 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-custome-pink/90 transition-colors">
                        <Plus className="h-5 w-5" /> Create New App
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Dashboard