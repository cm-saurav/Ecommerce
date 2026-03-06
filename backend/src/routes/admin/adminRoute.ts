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
import { CityController } from '../../controllers/admin/cityController.ts';
import { CityService } from '../../services/admin/cityServices.ts';
import { CityDao } from '../../daos/admin/cityDao.ts';
import { PincodeController } from '../../controllers/admin/pincodeController.ts';
import { PincodeService } from '../../services/admin/pincodeServices.ts';
import { PincodeDao } from '../../daos/admin/pincodeDao.ts';
const router = express.Router();

const controllerCategory = new CategoryController(new CategoryService(new CategoryDao));
const controllerProduct = new ProductController(new ProductService(new ProductDao));
const controllerState = new StateController(new StateService(new StateDao));
const controllerCity = new CityController(
  new CityService(new CityDao(), new StateDao())
);
const controllerPincode = new PincodeController(new PincodeService(new PincodeDao(),new CityDao()));


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

router.post('/city/create', controllerCity.create.bind(controllerCity));
router.get('/city/city-list', controllerCity.getAll.bind(controllerCity));
router.get('/city/:id', controllerCity.getById.bind(controllerCity));
router.patch('/city/update/:id', controllerCity.update.bind(controllerCity));
router.delete('/city/delete/:id', controllerCity.softDelete.bind(controllerCity));

//////////////////////////////////// pincode routes

router.post('/pincode/create', controllerPincode.create.bind(controllerPincode));
router.get('/pincode/list', controllerPincode.getAll.bind(controllerPincode));
router.get('/pincode/:id', controllerPincode.getById.bind(controllerPincode));
router.patch('/pincode/:id', controllerPincode.update.bind(controllerPincode));
router.delete("/pincode/delete/:id", controllerPincode.softDelete.bind(controllerPincode));




















export default router;
