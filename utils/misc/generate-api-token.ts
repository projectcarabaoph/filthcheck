import jwt from 'jsonwebtoken';
import type { TGenerateApiToken } from '@/utils/misc/_types';

const { JWT_SECRET } = process.env


export const generateApiToken = (user: TGenerateApiToken) => {
    return jwt.sign(
        { id: user.id, email: user.email },  // Payload
        JWT_SECRET as string,  // Secret key
    );
};
