import type { ReactNode } from "react"
import MarketingFooter from "@/app/(marketing)/_components/marketing-footer"
import MarketingNavigationContainer from "@/app/(marketing)/_components/marketing-navigation-container"

const MarketingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="min-h-dvh h-auto flex flex-col justify-center">
            <MarketingNavigationContainer />
            {children}
            <MarketingFooter />
        </main>
    )
}

export default MarketingLayout