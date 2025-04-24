'use client'


import ListComponent from "@/components/shared/list-component";
import { replacePlaceholders } from "@/utils/misc/replace-placeholder";
import paths from "@/utils/paths/paths.config";
import Link from "next/link";

export default function ProjectCodeSideNavigation({ project_code }: { project_code: string }) {

    console.log(project_code)

    const newUrl = replacePlaceholders(paths.app.analytics, { project_code })


    const projectCodeSideNavigationLink = [
        {
            id: 1,
            title: 'Api Keys',
            path: paths.app.home
        },
        {
            id: 1,
            title: 'Analytics',
            path: newUrl
        },
    ]

    return (
        <aside className="hidden md:flex  border border-black">
            <ListComponent
                data={projectCodeSideNavigationLink}
                as="ul"
                renderItem={(link) => (
                    <Link href={link.path}>
                        <li key={link.id} className="border border-black">
                            {link.title}
                        </li>
                    </Link>
                )}
            />
        </aside>
    )
}
