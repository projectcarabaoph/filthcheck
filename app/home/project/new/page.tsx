import CreateNewProjecForm from "./create-new-project-form"

const NewProject = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col gap-2 p-4 w-full max-w-7xl">
                <div className="flex flex-row justify-between gap-2">
                    <h1 className="text-lg font-bold text-gray-900 ">
                        Create New App
                    </h1>
                </div>

                <div className="flex flex-row justify-between gap-2">
                    <CreateNewProjecForm />
                </div>

            </div>
        </div>
    )
}

export default NewProject