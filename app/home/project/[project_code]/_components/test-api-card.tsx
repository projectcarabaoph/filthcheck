'use client'

import { useState } from "react";
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

import type { TTestApiCard, TTestApiCardSchema } from "@/app/home/project/_types";
import { testApiCardSchema } from "@/app/home/project/_lib/schemas";
import { usePostImage } from "@/hooks/use-post-image";


export default function TestApiCard({
    apiKey = ""
}: TTestApiCard) {

    const [imageURL, setImageURL] = useState<string>('')

    const { postImage, isLoading, output, responseTime } = usePostImage(apiKey)

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
        postImage(formData.imageURL)
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
                            className="bg-neutral-50 rounded-md px-1 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            type="submit"
                        >
                            POST
                        </button>
                    </div>
                    {errors.imageURL && <small className="text-red-500">{errors.imageURL.message}</small>}
                </form>
                <div className="flex flex-col gap-2 mt-2">
                    <p>Output:</p>
                    <pre className="bg-neutral-50 outline outline-[1px] outline-neutral-200 rounded-md p-2 overflow-x-auto max-w-full">
                        {isLoading ? <span>Loading...</span> : <code>{JSON.stringify(output, null, 2)}</code>}
                    </pre>
                    <p className="text-sm text-neutral-600">
                        Response time: {responseTime !== null ? `${(responseTime / 1000).toFixed(2)}s` : "0"}
                    </p>

                </div>
            </CardContent>
        </Card>
    )
}

