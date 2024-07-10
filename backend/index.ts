import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import messageRoutes from './routes/messageRoutes';
import chatbotRoutes from './routes/chatbotRoutes';
import authRoutes from './routes/authRoutes';
import { sequelize } from './config/db';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/messages', messageRoutes);
app.use('/chatbot', chatbotRoutes);
app.use('/auth', authRoutes);
// Error Handling Middleware
app.use(errorHandler);

// Database Connection
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
