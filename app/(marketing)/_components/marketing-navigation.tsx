
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import paths from '@/utils/paths/paths.config';
import { AvatarHolderSvg } from '@/public/assets/svgs';
import useScreenSize from '@/hooks/use-screen-size';
import type { IMarketingNavigation } from '@/app/(marketing)/_types';


const MarketingNavigation = ({ user }: IMarketingNavigation) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { width } = useScreenSize()

    useEffect(() => {
        const md: number = 768
        if (width >= md) {
            setIsOpen(false)
        }
    }, [width])

    return (
        <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={paths.marketing.landing} className="flex flex-row gap-2 items-center justify-center ml-2 text-xl font-bold text-gray-900">
                                <AvatarHolderSvg className="h-8 w-8" />
                                <span>FilthCheck</span>
                            </Link >
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">

                            <Link href={user?.id ? paths.app.home : paths.auth.signIn} className='p-2 rounded-md bg-custome-pink hover:bg-custome-pink/90 text-white '>
                                {user?.id ? 'Dashboard' : 'Sign In'}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-white">
                    <div className="pt-2 pb-3 space-y-1">
                        <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                            Documentation
                        </a>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">

                        <div className=" space-y-1  px-2">
                            <Link href={user?.id ? paths.app.home : paths.auth.signIn} className="block w-full text-center p-2 rounded-md border border-custome-pink bg-white text-custome-pink hover:bg-custome-pink hover:text-white">
                                {user?.id ? 'Dashboard' : 'Sign In'}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default MarketingNavigation