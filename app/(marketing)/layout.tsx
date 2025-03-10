import type { ReactNode } from "react"

const MarketingLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="min-h-dvh h-auto flex justify-center">
            {children}
        </main>
    )
}

export default MarketingLayout