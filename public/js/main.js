// ChronoFlow — Main JavaScript
'use strict';

// Gestion du mobile burger menu
const initMobileMenu = () => {
  const sidebar = document.querySelector('.sidebar');

  if (!sidebar) return;

  const menuButton = document.querySelector('[data-menu-toggle]');
  if (menuButton) {
    menuButton.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Fermer le menu en cliquant sur un lien
  const navLinks = sidebar.querySelectorAll('.sidebar-nav-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  });
};

// Gestion de la mise en focus des inputs
const initFormInteractions = () => {
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach((input) => {
    input.addEventListener('focus', function () {
      this.parentElement?.classList?.add('focused');
    });

    input.addEventListener('blur', function () {
      this.parentElement?.classList?.remove('focused');
    });
  });
};

// Gestion des accordéons et sections
const initAccordions = () => {
  const accordionButtons = document.querySelectorAll('[data-accordion-trigger]');

  accordionButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('data-accordion-trigger');
      const content = document.querySelector(`[data-accordion-content="${target}"]`);

      if (content) {
        content.classList.toggle('open');
        this.classList.toggle('open');
      }
    });
  });
};

// Gestion des modales
const initModals = () => {
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  closeButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const modal = this.closest('[data-modal]');
      if (modal) {
        modal.classList.add('hidden');
      }
    });
  });
};

// Gestion des notifications/toasts
const showToast = (message, type = 'info', duration = 3000) => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('visible');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
};

// Gestion des boutons de suppression avec confirmation
const initDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll('[data-confirm-delete]');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      if (!confirm('Êtes-vous sûr? Cette action ne peut pas être annulée.')) {
        e.preventDefault();
      }
    });
  });
};

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFormInteractions();
  initAccordions();
  initModals();
  initDeleteButtons();

  console.log('ChronoFlow app initialized');
});

// Export des fonctions utilitaires
export { showToast };
