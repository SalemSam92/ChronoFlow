# ChronoFlow — Frontend Application

Application de suivi de temps en temps réel avec Express.js et Twig.

## 📦 Installation

### Prérequis

- Node.js >= 25.9.0
- npm

### Étapes d'installation

1. **Cloner ou accéder au répertoire du projet**

   ```bash
   cd chronoflow
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur en développement**

   ```bash
   npm run dev
   ```

4. **Accéder à l'application**
   Ouvrir votre navigateur à : `http://localhost:3000`

## 🚀 Commandes disponibles

| Commande      | Description                       |
| ------------- | --------------------------------- |
| `npm install` | Installe toutes les dépendances   |
| `npm start`   | Lance le serveur en production    |
| `npm run dev` | Lance le serveur en développement |
| `npm test`    | Exécute les tests                 |

## 📁 Structure du projet

```
chronoflow/
├── app.js                      # Point d'entrée Express
├── package.json                # Dépendances et scripts
├── /src/
│   ├── /controllers/           # Contrôleurs (logique métier)
│   │   ├── dashboardController.js
│   │   ├── focusController.js
│   │   ├── historiqueController.js
│   │   ├── statistiquesController.js
│   │   ├── settingsController.js
│   │   └── authController.js
│   ├── /routes/                # Routes Express
│   │   ├── dashboard.js
│   │   ├── focus.js
│   │   ├── historique.js
│   │   ├── statistiques.js
│   │   ├── settings.js
│   │   └── auth.js
│   └── /views/                 # Templates Twig
│       ├── /layouts/
│       │   ├── base.html.twig  # Layout principal
│       │   └── auth.html.twig  # Layout authentification
│       ├── /components/        # Composants réutilisables
│       │   ├── sidebar.html.twig
│       │   ├── header.html.twig
│       │   ├── button.html.twig
│       │   ├── card.html.twig
│       │   ├── kpi.html.twig
│       │   ├── timer.html.twig
│       │   └── timeline.html.twig
│       └── /pages/             # Pages complètes
│           ├── dashboard.html.twig
│           ├── focus.html.twig
│           ├── historique.html.twig
│           ├── statistiques.html.twig
│           ├── settings.html.twig
│           ├── login.html.twig
│           ├── 404.html.twig
│           └── 500.html.twig
├── /public/
│   ├── /css/                   # Fichiers CSS
│   │   ├── variables.css       # Variables du design system
│   │   ├── layout.css          # Layout et grille
│   │   ├── components.css      # Styles des composants
│   │   ├── forms.css           # Styles des formulaires
│   │   └── pages.css           # Styles spécifiques aux pages
│   ├── /js/                    # JavaScript client
│   │   └── main.js             # Script principal
│   └── /images/                # Images et icônes
└── /docs/
    ├── designSystem.md         # Maquette et design system
    ├── PRD.md                  # Spécifications fonctionnelles
    └── ARCHITECTURE.md         # Architecture technique

```

## 🎨 Design System

Le projet respecte strictement le Design System défini dans `/docs/designSystem.md` qui inclut :

- **Palette de couleurs** : orange primaire, bleu secondaire, neutres
- **Typographie** : Inter, Inter, sans-serif avec 5 niveaux de titres
- **Spacing** : échelle 4px (xs, sm, md, lg, xl, xxl, xxxl)
- **Composants** : boutons, inputs, cards, grille 12 colonnes
- **Responsive** : mobile, tablette, desktop

### Fichiers CSS

| Fichier          | Contenu                                                  |
| ---------------- | -------------------------------------------------------- |
| `variables.css`  | Variables CSS du design system (couleurs, typo, spacing) |
| `layout.css`     | Sidebar, header, grille responsive                       |
| `components.css` | Boutons, cartes, panels, icônes, badges                  |
| `forms.css`      | Inputs, selects, toggles, checkboxes, radios             |
| `pages.css`      | Styles spécifiques à chaque page                         |

## 📄 Pages disponibles

### Public (authentification)

- `GET /auth/login` — Page de connexion

### Connecté

- `GET /dashboard` — Tableau de bord principal
- `GET /focus` — Session de focus en cours
- `GET /historique` — Historique des sessions
- `GET /statistiques` — Statistiques et rapports
- `GET /settings` — Paramètres de l'utilisateur

### Pages système

- `GET /` — Redirige vers `/dashboard`
- `404` — Page non trouvée
- `500` — Erreur serveur

## 🎯 Navigation

### Sidebar (gauche)

- 📊 Tableau de bord
- 🎯 Focus
- 📜 Historique
- 📈 Statistiques
- ⚙️ Paramètres
- ➕ Bouton primaire "Nouvelle session"
- ❓ Aide (pied de page)
- 📁 Archive (pied de page)

### Header (haut)

- Titre de la page
- Barre de recherche
- 🔔 Notifications
- Avatar utilisateur

## 🛠️ Développement

### Ajouter une nouvelle page

1. Créer le contrôleur dans `/src/controllers/`
2. Créer la route dans `/src/routes/`
3. Créer le template dans `/src/views/pages/`
4. Importer la route dans `app.js`

### Modifier les styles

Les CSS sont organisés par responsabilité :

- Changer une variable → `variables.css`
- Modifier le layout → `layout.css`
- Ajouter un composant → `components.css`
- Ajouter une page → `pages.css`

### Ajouter un composant Twig

Créer un fichier dans `/src/views/components/` et l'inclure avec :

```twig
{% include 'components/nom.html.twig' with { variable: value } %}
```

## 🌐 Variables d'environnement

Créer un fichier `.env` à la racine :

```
NODE_ENV=development
PORT=3000
```

## 📖 Documentation

- [Design System](/docs/designSystem.md) — Maquette et charte graphique
- [PRD](/docs/PRD.md) — Spécifications fonctionnelles
- [ARCHITECTURE](/docs/ARCHITECTURE.md) — Architecture technique

## 📝 Notes

- Aucun framework CSS externe (pure CSS)
- JavaScript vanilla, pas de dépendances complexes
- Templates Twig propres et modulaires
- Responsive design (mobile-first)
- Couleurs et spacing cohérents avec le design system

## 🚀 Déploiement

Pour déployer en production :

```bash
npm install
npm start
```

Le serveur se lance sur le port `3000` (configurable via `PORT`).

---

**ChronoFlow** — Suivi de temps en temps réel. Concentrez-vous sur l'essentiel.
