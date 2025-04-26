import { z } from "zod";

const PathsSchema = z.object({
  marketing: z.object({
    landing: z.string().min(1),
  }),
  documentation: z.object({
    docs: z.string().min(1),
  }),
  auth: z.object({
    signIn: z.string().min(1),
    callback: z.string().min(1),
    confirm: z.string().min(1),
  }),
  app: z.object({
    home: z.string().min(1),
    account: z.string().min(1),
    project: z.string().min(1),
    analytics: z.string().min(1),
    newProject: z.string().min(1),
  }),
});

const paths = PathsSchema.parse({
  marketing: {
    landing: "/",
  },
  documentation: {
    docs: "/docs",
  },
  auth: {
    signIn: "/auth/sign-in",
    callback: "/auth/callback",
    confirm: "/auth/confirm",
  },
  app: {
    home: "/home",
    account: "/home/account",
    project: "/home/project/:project_code",
    analytics: "/home/project/:project_code/analytics",

    newProject: "/home/project/new"
  },
} satisfies z.infer<typeof PathsSchema>);

export default paths;
