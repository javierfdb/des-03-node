import {Router} from 'express';
import { cardsController } from '../controllers/card.controller.js';

const router = Router()

router.get('/posts', cardsController.getAllCards);
router.get("/posts/:id", cardsController.takeCard);
router.post("/posts", cardsController.sendCard );
router.put("/posts/:id", cardsController.updateCard);
router.put("/posts/likes/:id", cardsController.updateCardLikes);
router.delete("/posts/:id", cardsController.deleteCard);

export default router;