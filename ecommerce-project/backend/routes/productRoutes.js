import { Router } from 'express';
import * as controller from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
const router = Router(); router.get('/', controller.list); router.get('/:id', controller.getOne); router.post('/', protect, adminOnly, upload.array('images', 6), controller.create); router.put('/:id', protect, adminOnly, upload.array('images', 6), controller.update); router.delete('/:id', protect, adminOnly, controller.remove); export default router;
