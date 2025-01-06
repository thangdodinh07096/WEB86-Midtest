import express from 'express';
import mongoose from 'mongoose';
import RootRouter from './src/routers/index.router.js';
import dotenv from 'dotenv';


dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const app = express();

app.use(express.json());

app.use('/api/v1', RootRouter);

app.listen(8080, () => {
    console.log("Server đã chạy thành công!");
});