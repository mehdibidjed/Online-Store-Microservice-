import express from 'express';
import { createUserProfile,updateUserProfile } from '../controllers/userController.js';
const router = express.Router();

router.post('/create-profile', createUserProfile);
router.put('/update-profile/:keycloakId', updateUserProfile);//#endregion

export default router;