import { Request, Response } from 'express';
import models from '../models';

// Get all plugins
export const getAllPlugins = async (req: Request, res: Response) => {
    try {
        const plugins = await models.Plugin.findAll();
        res.json(plugins);
    } catch (err) {
        res.status(500).send({ message: (err as Error).message });
    }
};

// Create new plugin
export const createPlugin = async (req: Request, res: Response) => {
    try {
        const newPlugin = await models.Plugin.create(req.body);
        res.status(201).json(newPlugin);
    } catch (err) {
        res.status(400).send({ message: (err as Error).message });
    }
};
