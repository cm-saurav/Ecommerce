import express from 'express';
import { CategoryController } from '../../controllers/admin/categoryController.ts';
import { CategoryService } from '../../services/admin/categoryServices.ts';
import { CategoryDao } from '../../daos/admin/categoryDao.ts';
const router = express.Router();

const controllerCategory = new CategoryController(new CategoryService(new CategoryDao));
const controllerProduct = new CategoryController(new CategoryService(new CategoryDao));



///////////////////////////////////////// Category routes

router.post('/category/create', controllerCategory.create.bind(controllerCategory));
router.get('/category/list', controllerCategory.getAll.bind(controllerCategory));
router.patch('/category/:id',controllerCategory.updateById.bind(controllerCategory));
router.delete('/category/:id', controllerCategory.deleteById.bind(controllerCategory))

/////////////////////////////////////// Products routes

router.post('product/create', controllerProduct.create.bind(controllerProduct));

















export default router;
