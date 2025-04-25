'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from '@iconify/react'

import ListComponent from "@/components/shared/list-component";

import { cn } from "@/lib/utils";
import { homeNavLinks } from "@/utils/constants/navlinks";

export default function ProjectSideNavigation() {

    const pathname = usePathname();

    return (
        <aside className="border-b border-gray-200 md:border-none md:flex ">
            <ListComponent
                data={homeNavLinks}
                as="ul"
                className="flex flex-row md:flex-col gap-2 p-2 w-full "
                renderItem={(link) => (
                    <Link key={link.id} href={link.path} className="md:w-full">
                        <li className={cn("p-2 md:w-full flex flex-row gap-2 hover:bg-black/10 rounded-md items-center", pathname === link.path && "bg-black/10")}>
                            <Icon icon={link.icon as string} className="w-6 h-6" />
                            <span className="hidden md:block">{link.title}</span>
                        </li>
                    </Link>
                )}
            />
        </aside>
    )
}
