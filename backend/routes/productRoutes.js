import express from 'express';
import {getProducts , getProductById} from '../controllers/productController.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(getProducts));

router.get('/:id', asyncHandler(getProductById));

export default router;