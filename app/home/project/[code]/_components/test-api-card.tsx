'use client'

import { useState } from "react";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";


const testApiCardSchema = z.object({
    imageURL: z
        .string({ required_error: "Missing required field: imageURL." })
        .url({ message: "Invalid image URL." })
})

export type TTestApiCardSchema = z.infer<typeof testApiCardSchema>


export default function TestApiCard() {

    const [imageURL, setImageURL] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm<TTestApiCardSchema>({
        resolver: zodResolver(testApiCardSchema),
        mode: 'all'
    })


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setImageURL(value)
    }

    const onSubmit = (formData: TTestApiCardSchema) => {
        postDetectImage(formData.imageURL)
    }

    const postDetectImage = async (imageURL: string) => {
        try {
            const response = await fetch('http://localhost:4000/api/detect/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ imageURL })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }
            console.log(data)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        }
    }

    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:shadow-elevated">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Test Endpoint</CardTitle>
                <CardDescription>Quickly validate your API integration by sending test requests to this endpoint</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <Input
                            {...register("imageURL", {
                                onChange: handleOnChange
                            })}
                            placeholder="Please provide image url here"
                            className="pr-12 font-mono text-sm bg-secondary/50"
                            value={imageURL}
                        />

                        <button
                            disabled={!isDirty || !isValid || isSubmitting}
                            className="bg-white pl-1 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            type="submit"
                        >
                            POST
                        </button>
                    </div>
                    {errors.imageURL && <small className="text-red-500">{errors.imageURL.message}</small>}
                </form>

            </CardContent>
        </Card>
    )
}

