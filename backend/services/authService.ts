import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const secretKey = 'yourSecretKey';  // Change this to your secret key

export const registerUser = async (userId: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ userId, password: hashedPassword });
    return newUser;
};

export const loginUser = async (userId: string, password: string) => {
    const user = await User.findOne({ where: { userId } });
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });
    return token;
};
