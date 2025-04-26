// eslint-disable no-unused-vars 
import "server-only";

import type { ReactNode } from 'react'
import type { IAnalytics } from "@/app/home/project/_types";

import ProjectCodeSideNavigation from "@/app/home/project/[project_code]/_components/project-code-side-navigation";


export default async function ProjectCodeLayout(props: { params: IAnalytics, children: ReactNode }) {
    const { project_code } = await props.params

    return (
        <main className="min-h-[calc(100dvh-64px)] h-auto flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 grid-rows-[64px_1fr] md:grid-cols-[280px_1fr] ">
                <ProjectCodeSideNavigation project_code={project_code} />
                {props.children}
            </div>
        </main>
    )

}
