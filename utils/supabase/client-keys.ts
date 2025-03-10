import { z } from "zod";
/**
 * Returns and validates the Supabase client keys from the environment.
 */
export function clientKeys() {

  const {
    NEXT_PUBLIC_SUPABASE_URL: url,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey,
    SUPABASE_SERVICE_ROLE: serviceRole,
    NEXT_PUBLIC_DEV_BASE_URL: devBaseURL
  } = process.env

  return z
    .object({
      url: z.string().min(1),
      anonKey: z.string().min(1),
      serviceRole: z.string().min(1),
      devBaseURL: z.string().min(1),
    })
    .parse({
      url,
      anonKey,
      serviceRole,
      devBaseURL,
    });
}
