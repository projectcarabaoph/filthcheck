'use client'

import { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import type { TAllowedDomainsSchema } from '@/app/home/project/_types';
import { allowedDomainsSchema } from '@/app/home/project/_lib/schemas';

interface IAllowedDomainsCard {
    domains?: string[];
}

export default function AllowedDomainsCard({ domains }: IAllowedDomainsCard) {

    const maxDomainLength: number = 2

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TAllowedDomainsSchema>({
        resolver: zodResolver(allowedDomainsSchema),
        mode: 'all'
    });

    const { fields } = useFieldArray({
        control,
        name: "domains",
    });

    useEffect(() => {
        reset({
            domains: Array(maxDomainLength)
                .fill(null)
                .map((_, i) => ({ domain: domains?.[i] || "" }))
        });
    }, [domains, reset]);


    const onSubmit = (data: TAllowedDomainsSchema) => {
        console.log("Submitted Data:", data);
    };

    return (
        <Card className="w-full glass-card shadow-card overflow-hidden relative transition-all duration-300 hover:shadow-elevated">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Allowed Domains</CardTitle>
                <CardDescription>Whitelisted domains that are authorized to make requests using this API key.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className='flex flex-col  gap-2'>
                            <Input
                                {...register(`domains.${index}.domain`)}
                                placeholder="www.example-domain.com"
                                className="pr-12 font-mono text-sm bg-secondary/50"
                            />
                            {errors.domains?.[index]?.domain && (
                                <p className="text-red-500 text-sm">
                                    {errors.domains[index].domain.message}
                                </p>
                            )}
                        </div>
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
                </form>
            </CardContent>
        </Card>
    )
}

