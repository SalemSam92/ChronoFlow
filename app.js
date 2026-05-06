'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Twig from 'twig';

// Routes imports
import authRoutes from './src/routes/auth.js';
import dashboardRoutes from './src/routes/dashboard.js';
import focusRoutes from './src/routes/focus.js';
import historiqueRoutes from './src/routes/historique.js';
import statistiquesRoutes from './src/routes/statistiques.js';
import settingsRoutes from './src/routes/settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuration
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'twig');
app.set('twig options', {
  strict_variables: false,
  allow_async: true,
  cache: false
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/focus', focusRoutes);
app.use('/historique', historiqueRoutes);
app.use('/statistiques', statistiquesRoutes);
app.use('/settings', settingsRoutes);

// Home redirect
app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page non trouvée'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500', {
    title: 'Erreur serveur',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ChronoFlow server running on port ${PORT}`);
  console.log(`View at http://localhost:${PORT}`);
});
