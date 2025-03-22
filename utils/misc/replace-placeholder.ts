
export const replacePlaceholders = (path: string, params: Record<string, string | number>): string => {
    const placeholderRegex = /:(\w+)/g;
    return path.replace(placeholderRegex, (_, key) => (key in params ? String(params[key]) : `:${key}`));
}