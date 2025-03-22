import { notFound } from "next/navigation";
import type { IProject } from "@/app/home/project/_types";


const Project = ({ params }: IProject) => {
    const { unique_code } = params;

    if (!unique_code) return notFound(); // Show 404 if no unique_code

    return (
        <div>
            <h1>Project unique_code: {unique_code}</h1>
            <p>Displaying project details for {unique_code}</p>
        </div>
    );
}

export default Project