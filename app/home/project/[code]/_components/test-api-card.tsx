'use client'

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { toast } from "sonner";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { IApiResponse, TTestApiCard, TTestApiCardSchema } from "@/app/home/project/_types";
import { testApiCardSchema } from "@/app/home/project/_lib/schemas";


export default function TestApiCard({
    apiKey = ""
}: TTestApiCard) {

    const [imageURL, setImageURL] = useState<string>('')
    const [output, setOutput] = useState<IApiResponse>({} as IApiResponse)
    const [isLoading, setIsLoading] = useState<boolean>(false)
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
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:4000/api/detect/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-FilthCheckAPI-Key': apiKey
                },
                body: JSON.stringify({ imageURL })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }
            setOutput(data)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        } finally {
            setIsLoading(false)
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
                            className="bg-white px-1 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            type="submit"
                        >
                            POST
                        </button>
                    </div>
                    {errors.imageURL && <small className="text-red-500">{errors.imageURL.message}</small>}
                </form>
                <div className="flex flex-col gap-2 mt-2">
                    <p>Output:</p>
                    <pre className="bg-indigo-50 rounded-md p-2">
                        {isLoading ? <span>Loading...</span> : <code>{JSON.stringify(output, null, 2)}</code>}
                    </pre>
                </div>
            </CardContent>
        </Card>
    )
}

