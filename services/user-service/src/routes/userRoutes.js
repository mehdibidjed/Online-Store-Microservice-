import express from 'express';
import { createUserProfile,getUserProfileById,updateUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.post('/create-profile', createUserProfile);
router.put('/update-profile/:id', updateUserProfile);
router.get('/get-profile/:id', getUserProfileById);
export default router;