import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database connected");
    } catch (err) {
        console.error("Error connecting to database: " + err);
    }
}
main().catch(err => console.error(err));

export const app = express();

app.use(express.json())

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
}));


// מסלול בסיסי
app.get('/', (req, res) => {
    res.send('השרת עובד!');
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});

import ('./req/req.mjs');