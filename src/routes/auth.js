'use strict';

import express from 'express';
import { getLogin, postLogin, getLogout } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/logout', getLogout);

export default router;
