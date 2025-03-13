import ApiKeyCard from "@/app/home/(dashboard)/_components/api-key-card"
import TestApiCard from "./_components/test-api-card"

const Dashboard = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-7xl">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg  font-bold text-gray-900 ">
                        Dashboard
                    </h1>
                    <span className="text-sm">Manage you api information</span>
                </div>
                <ApiKeyCard />
                <TestApiCard />
            </div>
        </div>
    )
}

export default Dashboard