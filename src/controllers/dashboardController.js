'use strict';

// Dashboard Controller
export const getDashboard = (req, res) => {
  res.render('pages/dashboard.twig', {
    title: 'Dashboard',
    currentPage: 'dashboard',
    user: {
      firstName: 'Julian',
    },
    data: {
      focusTotal: '124.5h',
      tasksCompleted: 342,
      currentStreak: 14,
    },
  });
};
