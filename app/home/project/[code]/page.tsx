import { notFound } from "next/navigation";
import type { IProject } from "@/app/home/project/_types";


const Project = ({ params }: IProject) => {
    const { code } = params;

    if (!code) return notFound(); // Show 404 if no code

    return (
        <div>
            <h1>Project code: {code}</h1>
            <p>Displaying project details for {code}</p>
        </div>
    );
}

export default Project