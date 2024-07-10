import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'UserId and password are required' });
    }

    try {
        const newUser = await registerUser(userId, password);
        console.log(newUser)
        res.status(201).json({ message: 'User registered successfully', userId: newUser.userId });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { userId, password } = req.body;
    if (!userId || !password) {
        return res.status(400).json({ message: 'UserId and password are required' });
    }

    try {
        const token = await loginUser(userId, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const logout = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(token)
    res.status(200).json({ message: 'Logout successful' });

}