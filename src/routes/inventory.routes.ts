import { Router } from 'express';
import { inventoryController } from '../controllers/inventory.controller';
import { validate } from '../middleware/validate.middleware';
import {
  createInventorySchema,
  updateInventorySchema,
  getInventoryByIdSchema
} from '../validations/inventory.validation';

const router = Router();

router.get('/', inventoryController.getAll.bind(inventoryController));
router.get('/:id', validate(getInventoryByIdSchema), inventoryController.getById.bind(inventoryController));
router.post('/', validate(createInventorySchema), inventoryController.create.bind(inventoryController));
router.put('/:id', validate(updateInventorySchema), inventoryController.update.bind(inventoryController));
router.delete('/:id', validate(getInventoryByIdSchema), inventoryController.delete.bind(inventoryController));

export default router;