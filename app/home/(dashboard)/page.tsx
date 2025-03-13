import ApiKeyCard from "@/app/home/(dashboard)/_components/api-key-card"

const Dashboard = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col items-center p-4 w-full max-w-7xl">
                <ApiKeyCard />
            </div>
        </div>
    )
}

export default Dashboard