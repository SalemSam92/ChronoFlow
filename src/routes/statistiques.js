'use strict';

import express from 'express';
import { getStatistiques } from '../controllers/statistiquesController.js';

const router = express.Router();

router.get('/', getStatistiques);

export default router;
