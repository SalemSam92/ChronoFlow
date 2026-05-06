'use strict';

// Settings Controller
export const getSettings = (req, res) => {
  res.render('pages/settings', {
    title: 'Paramètres',
    currentPage: 'settings',
    user: {
      firstName: 'Julian',
      lastName: 'Dupont',
      email: 'jean.dupont@acmecorp.com',
      bio: "Product Design Manager chez Acme Corp. Passionné par l'optimisation de la productivité.",
      theme: 'light',
      idleThreshold: 180,
    },
  });
};
