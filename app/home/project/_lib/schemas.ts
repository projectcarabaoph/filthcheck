import * as z from 'zod'

export const testApiCardSchema = z.object({
    imageURL: z
        .string({ required_error: "Missing required field: imageURL." })
        .url({ message: "Invalid image URL." })
})

const domainSchema = z.object({
    domain: z.union([
        z.string().url({ message: "Invalid domain URL." }),
        z.literal("")
    ]),
});

export const allowedDomainsSchema = z.object({
    domains: z.array(domainSchema)
});