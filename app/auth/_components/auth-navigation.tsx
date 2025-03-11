
'use client';

import Link from 'next/link';
import paths from '@/utils/paths/paths.config';
import { AvatarHolderSvg } from '@/public/assets/svgs/index';

const AuthNavigation = () => {

    return (
        <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href={paths.marketing.landing} className="flex flex-row gap-2 items-center justify-center ml-2 text-xl font-bold text-gray-900">
                                <AvatarHolderSvg className="h-8 w-8" />
                                <span>FilthCheck</span>
                            </Link >
                        </div>
                    </div>

                </div>
            </div>


        </nav>
    )
}

export default AuthNavigation