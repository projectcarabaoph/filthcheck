// eslint-disable no-unused-vars 
import "server-only";

import type { ReactNode } from 'react'
import { UserProvider } from "@/context/user-context";
import type { IUserData } from "@/context/_types";
import { serverClient } from "@/utils/supabase/server-client";

import ProjectContentContainer from "./_components/project-content-container";


export default async function HomeLayout({ children }: { children: ReactNode }) {

    const supabase = await serverClient()

    const { data: { user } } = await supabase.auth.getUser()

    return (
        <UserProvider userData={user as IUserData}>
            <ProjectContentContainer>
                {children}
            </ProjectContentContainer>
        </UserProvider>
    )
}
