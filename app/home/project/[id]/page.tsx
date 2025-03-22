import { notFound } from "next/navigation";
import type { IProject } from "@/app/home/project/_types";


const Project = ({ params }: IProject) => {
    const { id } = params;

    if (!id) return notFound(); // Show 404 if no ID

    return (
        <div>
            <h1>Project ID: {id}</h1>
            <p>Displaying project details for {id}</p>
        </div>
    );
}

export default Project