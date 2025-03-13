'use client'

import { Copy } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface IApiKeyCard {
    apiKey?: string;
}

export default function ApiKeyCard({
    apiKey = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5cf'
}: IApiKeyCard) {

    const envVariable = `FILTHCHECK_TOKEN='${apiKey}`
    const maskedKey = envVariable.substring(0, 26) + "•".repeat(envVariable.length - 14) + apiKey.substring(apiKey.length - 4);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(envVariable);
    };

    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:shadow-elevated">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">API Key</CardTitle>
                <CardDescription>Your API is secured behind an API gateway which requires an API Key for every request.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <Input
                        className="pr-12 font-mono text-sm bg-secondary/50"
                        value={maskedKey}
                        readOnly
                    />
                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={copyToClipboard}
                        aria-label="Copy API key"
                    >
                        <Copy className="h-4 w-4" />
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

