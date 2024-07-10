import { Request, Response } from 'express';
import models from '../models';

// Get all messages
export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await models.Message.findAll();
        res.json(messages);
    } catch (err) {
        res.status(500).send({ message: (err as Error).message });
    }
};

// Create new message
export const createMessage = async (req: Request, res: Response) => {
    try {
        const newMessage = await models.Message.create(req.body);
        res.status(200).json(newMessage);
    } catch (err) {
        res.status(400).send({ message: (err as Error).message });
    }
};
