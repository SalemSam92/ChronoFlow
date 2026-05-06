'use strict';

import express from 'express';
import { getFocus } from '../controllers/focusController.js';

const router = express.Router();

router.get('/', getFocus);

export default router;
