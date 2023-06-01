import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
const app = express();

import cardRouter from './routes/card.route.js'

app.use(cors());
app.use(express.json());
app.use('/api', cardRouter)

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
})




