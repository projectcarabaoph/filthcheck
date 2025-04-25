'use client'

import { usePathname } from "next/navigation";
import ProjectSideNavigation from "./project-side-navigation";
import { cn } from "@/lib/utils";
import HomeNavigation from "./home-navigation";

export default function ProjectContentContainer({ children }: { children: React.ReactNode }) {

    const pathname = usePathname()
    const isProjectCode = pathname.startsWith('/home/project')

    return (
        <main className="min-h-dvh h-auto grid grid-rows-[64px_1fr] grid-cols-1">
            <HomeNavigation />
            <div className={cn("grid", !isProjectCode && "w-full  max-w-7xl mx-auto grid-rows-[64px_1fr] md:grid-cols-[280px_1fr] ")}>
                {!isProjectCode && <ProjectSideNavigation />}
                {children}
            </div>
        </main>

    )
}
