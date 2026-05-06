'use strict';

// Statistiques Controller
export const getStatistiques = (req, res) => {
  res.render('pages/statistiques', {
    title: 'Statistiques',
    currentPage: 'statistiques',
    stats: {
      focusTotal: '124.5h',
      tasksCompleted: 342,
      currentStreak: 14,
      weeklyData: [
        { day: 'Lun', hours: 8.5 },
        { day: 'Mar', hours: 10.2 },
        { day: 'Mer', hours: 7.8 },
        { day: 'Jeu', hours: 11.5 },
        { day: 'Ven', hours: 9.5 },
        { day: 'Sam', hours: 5.2 },
        { day: 'Dim', hours: 6.0 },
      ],
      categories: {
        coding: 40,
        web: 25,
        communication: 20,
        idle: 15,
      },
    },
  });
};
