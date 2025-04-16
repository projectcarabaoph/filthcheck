import { useState } from 'react'
import useResponseTimer from '@/hooks/useResponseTimer'
import type { IApiResponse } from '@/app/home/project/_types'
import { toast } from 'sonner'

export function usePostImage(apiKey: string) {

    const [output, setOutput] = useState<IApiResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const { responseTime, startTimer, stopTimer } = useResponseTimer()

    const postImage = async (imageURL: string) => {
        setIsLoading(true)
        setOutput(null)
        startTimer()

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/detect/image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-FilthCheckAPI-Key': apiKey
                },
                body: JSON.stringify({ imageURL }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            setOutput(data)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
        } finally {
            stopTimer()
            setIsLoading(false)
        }
    }

    return {
        postImage,
        output,
        isLoading,
        responseTime,
    }
}
