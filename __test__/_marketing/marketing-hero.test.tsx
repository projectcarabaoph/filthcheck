/**
 * @jest-environment node
 */
import { renderToString } from "react-dom/server"
import MarketingHero from "@/app/(marketing)/_components/marketing-hero"
import { serverClient } from "@/utils/supabase/server-client"
import paths from "@/utils/paths/paths.config"

jest.mock("@/utils/supabase/server-client", () => ({
    serverClient: jest.fn(),
}))

describe("MarketingHero SSR", () => {
    it("renders 'Get Started' link to sign-in page when user is not logged in", async () => {
        ; (serverClient as jest.Mock).mockResolvedValue({
            auth: {
                getUser: async () => ({ data: { user: null } }),
            },
        })

        const view = renderToString(await MarketingHero()) // satisfies linter

        expect(view).toContain(paths.auth.signIn)
        expect(view).toContain("Get Started")
        expect(view).toContain("View Documentation")
    })

    it("renders 'Get Started' link to app home when user is logged in", async () => {
        ; (serverClient as jest.Mock).mockResolvedValue({
            auth: {
                getUser: async () => ({ data: { user: { id: "123" } } }),
            },
        })

        const view = renderToString(await MarketingHero())

        expect(view).toContain(paths.app.home)
        expect(view).toContain("Get Started")
        expect(view).toContain("View Documentation")
    })
})
