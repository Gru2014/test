import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = 'yourSecretKey';  // Change this to your secret key

interface AuthRequest extends Request {
    user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    });
};
