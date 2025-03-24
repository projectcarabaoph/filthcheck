import type { z } from 'zod'
import type { testApiCardSchema } from '@/app/home/project/_lib/schemas';

export interface IProject {
    params: { code: string }; // Get code from URL
}

export type TApiKeys = {
    api_key: string,
    id: string,
    profile_id: string,
    project_id: string,
    project_code: string,
    created_at: string,
    updated_at: string
}

export interface IClassification {
    label: string;
    score: number;
}

export interface IApiResponse {
    status: number;
    data: IClassification[];
}

export type TTestApiCardSchema = z.infer<typeof testApiCardSchema>

export type TTestApiCard = {
    apiKey?: string
}