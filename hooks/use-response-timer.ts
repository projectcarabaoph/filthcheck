import { useRef, useState } from 'react'

const useResponseTimer = () => {
    const [responseTime, setResponseTime] = useState<number | null>(null)
    const startRef = useRef<number | null>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const startTimer = () => {
        const now = performance.now()
        startRef.current = now
        setResponseTime(0)

        intervalRef.current = setInterval(() => {
            const elapsed = performance.now() - (startRef.current || now)
            setResponseTime(elapsed)
        }, 100)
    }

    const stopTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current)

        if (startRef.current !== null) {
            const end = performance.now()
            setResponseTime(end - startRef.current)
        }

        startRef.current = null
        intervalRef.current = null
    }

    return {
        responseTime,
        startTimer,
        stopTimer,
    }
}

export default useResponseTimer
