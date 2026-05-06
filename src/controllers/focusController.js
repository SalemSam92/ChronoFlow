'use strict';

// Focus Controller
export const getFocus = (req, res) => {
  res.render('pages/focus', {
    title: 'Focus',
    currentPage: 'focus',
    session: {
      status: 'active',
      elapsedTime: '24:42',
      currentActivity: 'Coding',
      startedAt: new Date(Date.now() - 5400000),
    },
  });
};
