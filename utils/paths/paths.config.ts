import { z } from "zod";

const PathsSchema = z.object({
  marketing: z.object({
    landing: z.string().min(1),
  }),
  auth: z.object({
    signIn: z.string().min(1),
    signUp: z.string().min(1),
    forgotPassword: z.string().min(1),
    callback: z.string().min(1),
    confirm: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    profile: z.string().min(1),
  }),
});

const paths = PathsSchema.parse({
  marketing: {
    landing: "/",
  },
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    forgotPassword: "/auth/forgot-password",
    callback: "/auth/callback",
    confirm: "/auth/confirm",
  },
  app: {
    home: "/home",
    profile: "/home/profile"
  },
} satisfies z.infer<typeof PathsSchema>);

export default paths;
