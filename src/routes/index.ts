import { Router } from 'express';
import inventoryRoutes from './inventory.routes';

const router = Router();

router.use('/inventory', inventoryRoutes);

// Aquí puedes agregar más rutas
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

export { router as routes };