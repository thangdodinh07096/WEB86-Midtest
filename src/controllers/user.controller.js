import UserModel from "../models/User.js";
import { generateRandomString } from "../utils/common.js";
import bcrypt from 'bcrypt';

const userController = {

    createUser: async (req, res) => {
        const { userName, email, password } = req.body;
      
        if (!userName || !email || !password) {
          return res.status(400).json({ error: 'userName, email, and password are required.' });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already registered.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
          userName,
          email,
          password: hashedPassword
        });
        try {
          await newUser.save();
          res.status(201).json({ message: 'User registered successfully.' });
        } catch (err) {
          res.status(500).json({ error: 'Failed to register user.' });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required.' });
        }
      
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ error: 'Invalid password.' });
        }
        const randomString = generateRandomString(8);
        const apiKey = `mern-${user._id}-${user.email}-${randomString}`;
        await UserModel.updateOne({ email: email }, { $set: { apiKey: apiKey } });
        res.status(200).json({ apiKey });
      }
}

export default userController;