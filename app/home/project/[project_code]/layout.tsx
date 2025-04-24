// eslint-disable no-unused-vars 
import "server-only";

import type { ReactNode } from 'react'

export default async function ProjectLayout({ children }: { children: ReactNode }) {

    return (
        <main className="border border-black min-h-[calc(100dvh-64px)] h-auto flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[280px_1fr] ">
                <div className="hidden md:flex border border-black">
                    left
                </div>
                {children}
            </div>
        </main>
    )
}
