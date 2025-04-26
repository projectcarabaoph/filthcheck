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



export const newProjectSchema = z.object({
    title: z.
        string()
        .min(1, { message: "Title is required." })
        .max(50, { message: 'Title cannot exceed 50 characters.' }),
    description: z
        .string()
        .min(1, { message: "Description is required." })
        .max(200, { message: 'Description cannot exceed 200 characters.' }),
})

