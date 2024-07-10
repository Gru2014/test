import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db';
import Message from './Message';
import Plugin from './Plugin';
import User from './User';


// Initialize all models
const models = {
    Message: Message.initModel(sequelize),
    Plugin: Plugin.initModel(sequelize),
    User: User.initModel(sequelize),
};

export default models;
export { sequelize };
