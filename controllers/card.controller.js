import {handleErrors} from "../database/errors.js";
import  {cardModel} from "../models/card.model.js"

const getAllCards = async (req, res) => {
    try {
        const result = await cardModel.verCard();
        //respuesta del servidor
        return res.status(200).json({ ok: true, message: "Cards registrados", result }); 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }    
}

const takeCard = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await cardModel.getCard(id);
      return res.json({ ok: true, result });
    } catch (error) {
      console.log(error);
      const { status, message } = handleErrors(error.code);
      return res.status(status).json({ ok: false, result: message });
    }
}

const sendCard = async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body
    console.log("valor req.body en la ruta /posts: ", req.body)
    try {
        const result = await cardModel.agregarCard({titulo, img, descripcion, likes})
        return res.status(201).json({ ok: true, message: "Card agregada con éxito", result }); //respuesta del servidor 
    } catch (error) {
        console.log(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message }); //respuesta del servidor
    }
}

const updateCard = async (req, res) => {
    const { id } = req.params;
    const { titulo, img, descripcion, likes} = req.body;
  
    try {
      const result = await cardModel.refreshCard(id, { titulo, img, descripcion, likes });
      return res.status(200).json({ ok: true, result });
    } catch (error) {
      console.log(error);
      const { status, message } = handleErrors(error.code);
      return res.status(status).json({ ok: false, result: message });
    }
};

const updateCardLikes = async (req, res) => {
    const { id } = req.params;
    const {likes} = req.body;
  
    try {
      const result = await cardModel.refreshCardLike(id, {likes});
      return res.status(200).json({ ok: true, result });
    } catch (error) {
      console.log(error);
      const { status, message } = handleErrors(error.code);
      return res.status(status).json({ ok: false, result: message });
    }
};

const deleteCard = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await cardModel.removeCard(id);
      return res.status(200).json({ ok: true, result });
    } catch (error) {
      console.log(error);
      const { status, message } = handleErrors(error.code);
      return res.status(status).json({ ok: false, result: message });
    }
  };

export const cardsController = {
    getAllCards,
    takeCard, 
    sendCard,
    updateCard,
    updateCardLikes,
    deleteCard,
}