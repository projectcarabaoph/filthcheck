export type TAppCard = {
    project_id: string,
    profile_id: string,
    title: string,
    description: string,
    plan: 'free' | 'pro',
    region: string,
    created_at: string,
    updated_at: string,
    pattern: string
}