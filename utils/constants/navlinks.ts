import type { THomeNavlinks } from "@/utils/constants/_types";
import paths from "@/utils/paths/paths.config";

export const homeNavLinks: THomeNavlinks[] = [
    {
        id: 1,
        title: 'Home',
        path: paths.app.home
    },
    {
        id: 2,
        title: 'Account',
        path: paths.app.account
    },
]