'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface IAllowedDomainsCard {
    domains?: string[];
}

export default function AllowedDomainsCard({ domains }: IAllowedDomainsCard) {


    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:shadow-elevated">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Allowed Domains</CardTitle>
                <CardDescription>   Whitelisted domains that are authorized to make requests using this API key.</CardDescription>
            </CardHeader>
            <CardContent>
                <div >
                    <Input
                        className="pr-12 font-mono text-sm bg-secondary/50"
                    />

                </div>
            </CardContent>
        </Card>
    )
}

