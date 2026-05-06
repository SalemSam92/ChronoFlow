'use strict';

import express from 'express';
import { getHistorique } from '../controllers/historiqueController.js';

const router = express.Router();

router.get('/', getHistorique);

export default router;
