'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function TestApiCard() {

    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:shadow-elevated">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Test Endpoint</CardTitle>
                <CardDescription>Quickly validate your API integration by sending test requests to this endpoint</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <Input
                        placeholder="Please provide image url here"
                        className="pr-12 font-mono text-sm bg-secondary/50"
                        value={''}
                        readOnly
                    />
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => { }}
                        aria-label="Copy API key"
                    >
                        POST
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

