import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env

export const verifyApiToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
    }
};

