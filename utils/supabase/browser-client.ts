import { createBrowserClient } from "@supabase/ssr";
import { clientKeys } from "@/utils/supabase/client-keys";

export function browserClient() {
    const { url, anonKey } = clientKeys()

    return createBrowserClient(url, anonKey);
}
