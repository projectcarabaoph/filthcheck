import type { IUserData } from "@/context/_types"

export interface IDocsContainer {
    markdownText: string
    user: IUserData | null
}
