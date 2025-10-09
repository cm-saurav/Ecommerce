import express from 'express';
import UserController from '../controllers/userController.ts'
const router = express.Router();

router.post('/addUser', UserController.addUser);
router.post('/verifyOtp', UserController.verifyOtp);



export default router;