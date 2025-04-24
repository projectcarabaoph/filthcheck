'use client'

import { useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';

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

import { updateAllowedDomains } from '@/app/home/project/actions';

export interface IAllowedDomainsCard {
    domains?: string[];
    project_id?: string
}

export default function AllowedDomainsCard({ domains, project_id }: IAllowedDomainsCard) {

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
        try {

            const formData = new FormData()
            formData.append("domains", JSON.stringify(data.domains.map((d) => d.domain.trim())));
            formData.append('project_id', project_id as string)

            updateAllowedDomains(formData)

            toast.success('Allowed domains updated successfully.')

        } catch (error) {
            if (error instanceof Error) toast.error(error.message)

        }
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
                        <div key={field.id} className='flex flex-col gap-2'>
                            <Input
                                {...register(`domains.${index}.domain`)}
                                placeholder="www.example-domain.com"
                                className="font-mono text-sm bg-secondary/50"
                            />

                            {errors.domains?.[index]?.domain && (
                                <small className="text-red-500 text-sm">
                                    {errors.domains[index].domain.message}
                                </small>
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

