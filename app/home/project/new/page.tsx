<<<<<<< Updated upstream
import CreateNewProjecForm from "@/app/home/project/new/_components/create-new-project-form"

const NewProject = () => {
    return (
        <div className=" flex flex-col items-center  gap-2 ">
=======
import CreateNewProjecForm from "@/app/home/project/new/create-new-project-form"

const NewProject = () => {
    return (
        <div className=" flex justify-center ">
>>>>>>> Stashed changes
            <div className="max-w-7xl w-full p-2 flex flex-col">
                <div className="flex flex-col gap-2 p-2">
                    <h1 className="text-lg font-bold text-gray-900 ">
                        Create New App
                    </h1>
                </div>
<<<<<<< Updated upstream
                <div className="flex flex-col gap-2 p-2">
                    <CreateNewProjecForm />
                </div>
=======
            </div>
            <div className="flex flex-col gap-2 p-2">
                <CreateNewProjecForm />
>>>>>>> Stashed changes
            </div>
        </div>
    )
}

export default NewProject