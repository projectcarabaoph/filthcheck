'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
// import { Home, LogOut, Menu, User, X } from "lucide-react";
import { Icon } from '@iconify/react'
import { AvatarHolderSvg } from "@/public/assets/svgs";
import paths from "@/utils/paths/paths.config";
import { useUser } from "@/context/user-context";

import { homeNavLinks } from "@/utils/constants/navlinks";
import useScreenSize from "@/hooks/use-screen-size";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";
import ListComponent from "@/components/shared/list-component";


export default function HomeNavigation() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAvatarOpen, setIsAvatarOpen] = useState<boolean>(false)

    const user = useUser()
    const { width } = useScreenSize()

    useEffect(() => {
        const md: number = 768

        if (width >= md) setIsOpen(false)
        if (width < md) setIsAvatarOpen(false)

    }, [width])

    return (
        <nav className="bg-white shadow-sm sticky top-0  z-50">
            <div className="max-w-7xl mx-auto px-4 ">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={user.id ? paths.app.home : paths.marketing.landing} className="flex flex-row gap-2 items-center justify-center text-xl font-bold text-gray-900">
                                <AvatarHolderSvg className="h-8 w-8" />
                                <span>FilthCheck</span>
                            </Link >
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="relative">
                            <DropdownMenu open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                        onMouseEnter={() => setIsAvatarOpen(true)}
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.user_metadata.avatar_url} alt="profile" />
                                            <AvatarFallback>FC</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger >
                                <DropdownMenuContent className="bg-white w-56 border-slate-200" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm text-black font-medium leading-none">{user.user_metadata.full_name}</p>
                                            <p className="text-xs text-gray-400 leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-slate-200" />
                                    <DropdownMenuItem onClick={() => setIsAvatarOpen(false)} className="text-black focus:text-gray-600 hover:bg-transparent focus:bg-transparent">
                                        <Icon icon="fluent:home-24-regular" className="mr-2 h-4 w-4" />
                                        <Link href={paths.app.home}>Home</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-slate-200" />
                                    <DropdownMenuItem onClick={() => setIsAvatarOpen(false)} className="text-black focus:text-gray-600 hover:bg-transparent focus:bg-transparent">
                                        <Icon icon="fluent:person-24-regular" className="mr-2 h-4 w-4" />
                                        <Link href={paths.app.account}>Account</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-slate-200" />
                                    <DropdownMenuItem onClick={() => signOut()} className="text-black focus:text-gray-600 hover:bg-transparent focus:bg-transparent" >
                                        <Icon icon="material-symbols:logout-sharp" className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? (
                                <Icon icon="material-symbols:close" className="block h-6 w-6" />

                            ) : (
                                <Icon icon="material-symbols:menu" className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-white">
                    <ListComponent
                        data={homeNavLinks}
                        className="pt-2 pb-3 space-y-1"
                        renderItem={(link) => (
                            <Link
                                onClick={() => setIsOpen(!isOpen)}
                                key={link.id}
                                href={link.path}
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                {link.title}
                            </Link>
                        )}
                    />

                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className=" space-y-1  px-2">
                            <Button onClick={() => signOut()} variant='default' className="w-full text-center py-5 rounded-md border border-custome-pink bg-white text-custome-pink hover:bg-custome-pink hover:text-white">
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
