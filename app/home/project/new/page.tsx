import CreateNewProjecForm from "@/app/home/project/new/create-new-project-form"

const NewProject = () => {
    return (
        <div className=" flex justify-center ">
            <div className="max-w-7xl w-full p-2 flex flex-col">
                <div className="flex flex-col gap-2 p-2">
                    <h1 className="text-lg font-bold text-gray-900 ">
                        Create New App
                    </h1>
                </div>
            </div>
            <div className="flex flex-col gap-2 p-2">
                <CreateNewProjecForm />
            </div>
        </div>
    )
}

export default NewProject