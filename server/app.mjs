import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    try{
        // const connection = process.env.NODE_ENV === 'development' ? process.env.MONGO_DB_URL : process.env.ATLAS_URL;
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

// הפעלת השרת
app.listen(process.env.PORT, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`);
});

import ('./req/req.mjs');