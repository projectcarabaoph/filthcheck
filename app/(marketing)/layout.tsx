import type { ReactNode } from "react"
import MarketingNavigation from "@/app/(marketing)/_components/marketing-navigation"
import MarketingFooter from "@/app/(marketing)/_components/marketing-footer"

const MarketingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="min-h-dvh h-auto flex flex-col justify-center">
            <MarketingNavigation />
            {children}
            <MarketingFooter />
        </main>
    )
}

export default MarketingLayout