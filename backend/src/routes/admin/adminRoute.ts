import express from 'express';
import { CategoryController } from '../../controllers/admin/categoryController.ts';
import { CategoryService } from '../../services/admin/categoryServices.ts';
import { CategoryDao } from '../../daos/admin/categoryDao.ts';
import { ProductController } from '../../controllers/admin/productController.ts';
import { ProductService } from '../../services/admin/productServices.ts';
import { ProductDao } from '../../daos/admin/productDao.ts';
import { StateController } from '../../controllers/admin/stateController.ts';
import { StateService } from '../../services/admin/stateServices.ts';
import { StateDao } from '../../daos/admin/stateDao.ts';
const router = express.Router();

const controllerCategory = new CategoryController(new CategoryService(new CategoryDao));
const controllerProduct = new ProductController(new ProductService(new ProductDao));
const controllerState = new StateController(new StateService(new StateDao));



///////////////////////////////////////// Category routes

router.post('/category/create', controllerCategory.create.bind(controllerCategory));
router.get('/category/list', controllerCategory.getAll.bind(controllerCategory));
router.patch('/category/:id',controllerCategory.updateById.bind(controllerCategory));
router.delete('/category/:id', controllerCategory.deleteById.bind(controllerCategory))

/////////////////////////////////////// Products routes

router.post('/product/create', controllerProduct.create.bind(controllerProduct));
router.get('/product', controllerProduct.getAll.bind(controllerProduct));
router.get('/product/:id', controllerProduct.getById.bind(controllerProduct));
router.patch('/product/:id', controllerProduct.updateById.bind(controllerProduct));
router.delete('/product/:id', controllerProduct.deleteById.bind(controllerProduct));

///////////////////////////////////// state routes

router.post('/state/create', controllerState.create.bind(controllerState));
router.get('/state/state-list', controllerState.getAll.bind(controllerState));
router.patch('/state/update/:id', controllerState.update.bind(controllerState));
router.get('/state/:id', controllerState.getById.bind(controllerState));
router.delete("/state/delete/:id", controllerState.softDelete.bind(controllerState));

//////////////////////////////////   city routes

















export default router;
