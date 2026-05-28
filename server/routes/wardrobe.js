import express from 'express';
import { getWardrobeItems, addWardrobeItem, removeWardrobeItem } from '../controllers/wardrobeController.js';

const router = express.Router();

router.get('/', getWardrobeItems);
router.post('/', addWardrobeItem);
router.delete('/:id', removeWardrobeItem);

export default router;
