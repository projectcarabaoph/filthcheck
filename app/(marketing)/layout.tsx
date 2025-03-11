import type { ReactNode } from "react"
import MarketingNavigation from "@/app/(marketing)/_components/marketing-navigation"

const MarketingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="min-h-dvh h-auto flex justify-center">
            <MarketingNavigation />
            {children}
        </main>
    )
}

export default MarketingLayout