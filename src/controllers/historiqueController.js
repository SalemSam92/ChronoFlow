'use strict';

// Historique Controller
export const getHistorique = (req, res) => {
  res.render('pages/historique', {
    title: 'Historique',
    currentPage: 'historique',
    sessions: [
      {
        id: 1,
        title: "Rédaction de la page d'accueil",
        project: 'Marketing',
        duration: '45m',
        startTime: '09:15',
        endTime: '10:00',
        status: 'completed',
      },
      {
        id: 2,
        title: "Tests d'intégration API",
        project: 'Plateforme',
        duration: '2h 15m',
        startTime: '10:30',
        endTime: '12:45',
        status: 'in-progress',
      },
    ],
  });
};
