'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from '@iconify/react'

import ListComponent from "@/components/shared/list-component";

import { replacePlaceholders } from "@/utils/misc/replace-placeholder";
import paths from "@/utils/paths/paths.config";

import { cn } from "@/lib/utils";

export default function ProjectCodeSideNavigation({ project_code }: { project_code: string }) {

    const newPathProject = replacePlaceholders(paths.app.project, { project_code })
    const newPathAnalytics = replacePlaceholders(paths.app.analytics, { project_code })

    const pathname = usePathname();

    const projectCodeSideNavigationLink = [
        {
            id: 1,
            title: 'Api Keys',
            icon: 'carbon:api-key',
            path: newPathProject
        },
        {
            id: 2,
            title: 'Usage',
            icon: 'fluent:data-usage-16-regular',
            path: newPathAnalytics
        },
    ]

    return (
        <aside className="border-b border-gray-200 md:border-none md:flex ">
            <ListComponent
                data={projectCodeSideNavigationLink}
                as="ul"
                className="flex flex-row md:flex-col gap-2 p-2 w-full "
                renderItem={(link) => (
                    <Link key={link.id} href={link.path} className="md:w-full">
                        <li className={cn("p-2 md:w-full flex flex-row gap-2 hover:bg-black/10 rounded-md items-center", pathname === link.path && "bg-black/10")}>
                            <Icon icon={link.icon} className="w-6 h-6" />
                            <span className="hidden md:block">{link.title}</span>
                        </li>
                    </Link>
                )}
            />
        </aside>
    )
}
