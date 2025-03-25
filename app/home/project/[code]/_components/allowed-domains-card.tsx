'use client'

import { Button } from "@/components/ui/button";
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

    const maxDomainLength: number = 2

    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:shadow-elevated">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Allowed Domains</CardTitle>
                <CardDescription>Whitelisted domains that are authorized to make requests using this API key.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {Array(maxDomainLength)
                        .fill(null)
                        .map((_, i) => (
                            <Input
                                key={i}
                                value={domains?.[i] ?? ""}
                                placeholder="www.example-domain.com"
                                className="pr-12 font-mono text-sm bg-secondary/50"
                            />
                        ))}
                    <div className="flex justify-end">
                        <Button
                            variant='default'
                            type="submit"
                            className="bg-custome-pink hover:bg-custome-pink/90"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

