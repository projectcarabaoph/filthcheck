import { serverClient } from "@/utils/supabase/server-client"
import MarketingNavigation from "./marketing-navigation"
import type { IUserData } from "@/context/_types"

export default async function MarketingNavigationContainer() {
    const supabase = await serverClient()

    const { data: { user } } = await supabase.auth.getUser()


    console.log("asd", user)
    return (
        <MarketingNavigation user={user as IUserData} />
    )
}
