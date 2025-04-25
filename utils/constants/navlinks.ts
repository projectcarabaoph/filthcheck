import type { THomeNavlinks } from "@/utils/constants/_types";
import paths from "@/utils/paths/paths.config";

export const homeNavLinks: THomeNavlinks[] = [
    {
        id: 1,
        title: 'Home',
        icon: 'fluent:home-24-regular',
        path: paths.app.home
    },
    {
        id: 2,
        title: 'Account',
        icon: 'fluent:person-24-regular',
        path: paths.app.account
    },
]