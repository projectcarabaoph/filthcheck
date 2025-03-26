export const parseDomainLinks = (socialLinks: string): string[] => {
    try {
        const parsedLinks = JSON.parse(socialLinks);
        if (!Array.isArray(parsedLinks)) {
            throw new Error("Expected an array.");
        }
        return parsedLinks;
    } catch {
        throw new Error("Invalid JSON format or not an array.");
    }
};
