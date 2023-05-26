import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

import {handleErrors} from "./db/errors.js";
import {verCard, agregarCard} from './db/index.js';

app.use(express.json());

const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server en puerto: http://localhost:${PORT}`);
})

app.get("/", (req, res) => {
    res.json({ ok: true, result: "todo ok"});
});

//1. GET para ver todos los cards registrados en la tabla cards, con try/catch para validar
app.get("/posts", async (req, res) => {
    try {
        const result = await verCard();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Cards registrados", result }); 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});

//2. POST para ingresar una card en la tabla posts
app.post("/posts", async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    console.log("valor req.body en la ruta /posts: ", req.body)
    try {
        const result = await agregarCard({titulo, img, descripcion, likes})
        return res.status(201).json({ ok: true, message: "Card agregada con éxito", result }); //respuesta del servidor 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
});





