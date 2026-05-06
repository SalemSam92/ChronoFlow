'use strict';

// Auth Controller
export const getLogin = (req, res) => {
  res.render('pages/login.twig', {
    title: 'Connexion',
    currentPage: 'login',
  });
};

export const postLogin = (req, res) => {
  // Mock login
  res.redirect('/dashboard');
};

export const getLogout = (req, res) => {
  res.redirect('/auth/login');
};
