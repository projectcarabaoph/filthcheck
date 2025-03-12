// eslint-disable no-unused-vars 
import "server-only";

import type { ReactNode } from 'react'
import { UserProvider } from "@/context/user-context";
import type { IUserData } from "@/context/_types";
import { serverClient } from "@/utils/supabase/server-client";
import HomeNavigation from "@/app/home/_components/home-navigation";


export default async function HomeLayout({ children }: { children: ReactNode }) {

    const supabase = await serverClient()

    const { data: { user } } = await supabase.auth.getUser()

    return (
        <UserProvider userData={user as IUserData}>
            <main className="min-h-dvh h-auto grid grid-rows-[64px_1fr] grid-cols-1">
                <HomeNavigation />
                {children}
            </main>
        </UserProvider>
    )
}
