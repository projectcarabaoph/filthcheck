import type { z } from 'zod'
import type { allowedDomainsSchema, testApiCardSchema } from '@/app/home/project/_lib/schemas';

export interface IProject {
    params: { project_code: string }; // Get project_code from URL
}

export type TApiKeys = {
    api_key: string,
    id: string,
    profile_id: string,
    project_id: string,
    project_code: string,
    created_at: string,
    updated_at: string
    domains: string
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

export type TAllowedDomainsSchema = z.infer<typeof allowedDomainsSchema>;


export interface IApiRequest {
    id: string;
    project_code: string,
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    status_code: number;
    response_time_ms: number;
    ip_address: string;
    created_at: string;
    requestBody?: string;
    responseBody?: string;
}

export interface IAnalyticsRequestTable {
    requests: IApiRequest[];
    pageSize?: number;
    caption?: string;
}

export interface IAnalytics {
    params: { project_code: string };
}
