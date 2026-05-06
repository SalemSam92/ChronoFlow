CHRONOFLOW PROJECT STRUCTURE
────────────────────────────────────────────────────────────────

chronoflow/
│
├── 📄 app.js (Point d'entrée Express)
├── 📄 package.json (Dépendances NPM)
├── 📄 .env.example (Variables d'environnement)
├── 📄 README.md (Guide d'installation et documentation)
├── 📄 IMPLEMENTATION.md (Résumé des livrables)
├── 📄 PROJECT_STRUCTURE.md (Ce fichier)
│
├── 📁 /src/ (Code source)
│ │
│ ├── 📁 /controllers/ (Logique métier - 6 fichiers)
│ │ ├── dashboardController.js (GET /dashboard)
│ │ ├── focusController.js (GET /focus)
│ │ ├── historiqueController.js (GET /historique)
│ │ ├── statistiquesController.js (GET /statistiques)
│ │ ├── settingsController.js (GET /settings)
│ │ └── authController.js (GET/POST /auth/_)
│ │
│ ├── 📁 /routes/ (Routes Express - 6 fichiers)
│ │ ├── dashboard.js → /dashboard
│ │ ├── focus.js → /focus
│ │ ├── historique.js → /historique
│ │ ├── statistiques.js → /statistiques
│ │ ├── settings.js → /settings
│ │ └── auth.js → /auth/_
│ │
│ └── 📁 /views/ (Templates Twig - 17 fichiers)
│ │
│ ├── 📁 /layouts/ (Layouts - 2 fichiers)
│ │ ├── base.html.twig (Layout principal)
│ │ └── auth.html.twig (Layout authentification)
│ │
│ ├── 📁 /components/ (Composants réutilisables - 7 fichiers)
│ │ ├── sidebar.html.twig (Navigation latérale)
│ │ ├── header.html.twig (En-tête avec titre et actions)
│ │ ├── button.html.twig (Bouton réutilisable)
│ │ ├── card.html.twig (Card générique)
│ │ ├── kpi.html.twig (Card KPI avec métrique)
│ │ ├── timer.html.twig (Widget timer circulaire)
│ │ └── timeline.html.twig (Barre timeline segmentée)
│ │
│ └── 📁 /pages/ (Pages complètes - 8 fichiers)
│ ├── dashboard.html.twig (Tableau de bord - objectifs, KPI, charts)
│ ├── focus.html.twig (Session de focus active)
│ ├── historique.html.twig (Historique des sessions)
│ ├── statistiques.html.twig (Statistiques et rapports)
│ ├── settings.html.twig (Paramètres utilisateur)
│ ├── login.html.twig (Authentification)
│ ├── 404.html.twig (Erreur page non trouvée)
│ └── 500.html.twig (Erreur serveur)
│
├── 📁 /public/ (Fichiers statiques)
│ │
│ ├── 📁 /css/ (Feuilles de style - 5 fichiers)
│ │ ├── variables.css (~50 variables du design system)
│ │ │ • Couleurs (primaires, secondaires, neutres, états)
│ │ │ • Typographie (5 niveaux de titres)
│ │ │ • Spacing (échelle 4px)
│ │ │ • Rayons, ombres, bordures
│ │ │
│ │ ├── layout.css (Structure responsive)
│ │ │ • Sidebar fixe (280px)
│ │ │ • Header sticky (84px)
│ │ │ • Grille 12 colonnes
│ │ │ • Breakpoints (768px, 1024px)
│ │ │
│ │ ├── components.css (Composants UI)
│ │ │ • Boutons (5 variantes)
│ │ │ • Cartes et panneaux
│ │ │ • KPI cards avec trends
│ │ │ • Badges (5 couleurs)
│ │ │ • Icônes
│ │ │
│ │ ├── forms.css (Formulaires)
│ │ │ • Inputs, selects, textareas
│ │ │ • Checkboxes, radios, toggles
│ │ │ • États (focus, disabled, error, success)
│ │ │ • Validation
│ │ │
│ │ └── pages.css (Styles spécifiques des pages)
│ │ • Dashboard, Focus, Historique
│ │ • Statistiques, Settings, Login
│ │ • Toasts notifications
│ │
│ ├── 📁 /js/ (JavaScript client - 1 fichier)
│ │ └── main.js (Interactions frontend)
│ │ • Menu mobile
│ │ • Formulaires
│ │ • Accordéons
│ │ • Modales
│ │ • Notifications
│ │
│ └── 📁 /images/ (Images et icônes)
│ (répertoire vide - à remplir)
│
└── 📁 /docs/ (Documentation)
├── designSystem.md (Maquette & charte graphique)
├── PRD.md (Spécifications fonctionnelles)
└── ARCHITECTURE.md (Architecture technique)

════════════════════════════════════════════════════════════════

FICHIERS CLÉS PAR SECTION

1️⃣ CONFIGURATION
• app.js - Point d'entrée avec Express et Twig
• package.json - Dépendances (express@5.2.1, twig@1.15.4)
• .env.example - Variables d'environnement

2️⃣ CSS (5 fichiers = ~2000 lignes)
• variables.css - Design system (couleurs, typo, spacing)
• layout.css - Sidebar, header, grille responsive
• components.css - Boutons, cards, badges, icônes
• forms.css - Inputs, toggles, radios, checkboxes, validation
• pages.css - Styles spécifiques Dashboard/Focus/Historique/Stats/Settings/Login

3️⃣ TWIG (17 fichiers = ~2500 lignes)
Layouts (2):
• base.html.twig - Structure principale
• auth.html.twig - Structure authentification

Composants (7):
• sidebar.html.twig - Navigation avec CTA
• header.html.twig - Titre + recherche + avatar
• button.html.twig - Bouton réutilisable
• card.html.twig - Card générique
• kpi.html.twig - Card KPI
• timer.html.twig - Timer circulaire
• timeline.html.twig - Timeline segmentée

Pages (8):
• dashboard.html.twig - Tableau de bord complet
• focus.html.twig - Session active
• historique.html.twig - Historique avec filtres
• statistiques.html.twig - Graphiques et KPI
• settings.html.twig - Paramètres utilisateur
• login.html.twig - Authentification
• 404.html.twig, 500.html.twig - Pages d'erreur

4️⃣ CONTRÔLEURS (6 fichiers = ~100 lignes)
• dashboardController.js
• focusController.js
• historiqueController.js
• statistiquesController.js
• settingsController.js
• authController.js

5️⃣ ROUTES (6 fichiers = ~60 lignes)
• dashboard.js → GET /dashboard
• focus.js → GET /focus
• historique.js → GET /historique
• statistiques.js → GET /statistiques
• settings.js → GET /settings
• auth.js → GET/POST /auth/\*

6️⃣ JAVASCRIPT CLIENT (1 fichier = ~150 lignes)
• main.js - Menu mobile, formulaires, modales, toasts

════════════════════════════════════════════════════════════════

PAGES ET ROUTES

┌─ AUTHENTIFICATION ──────────────────────────────────┐
│ GET /auth/login login.html.twig │
│ POST /auth/login (redirect) │
│ GET /auth/logout (redirect) │
└─────────────────────────────────────────────────────┘

┌─ APPLICATION ───────────────────────────────────────┐
│ GET / → /dashboard │
│ GET /dashboard dashboard.html.twig │
│ GET /focus focus.html.twig │
│ GET /historique historique.html.twig│
│ GET /statistiques statistiques.html │
│ GET /settings settings.html.twig │
│ │
│ ERREURS │
│ GET 404 404.html.twig │
│ GET 500 500.html.twig │
└─────────────────────────────────────────────────────┘

════════════════════════════════════════════════════════════════

DESIGN SYSTEM APPLIQUÉ

COULEURS
• Primaire : #FF8123 (orange)
• Secondaire : #4B8AFF (bleu)
• Succès : #2EBF7F (vert)
• Warning : #F2A54C (orange clair)
• Danger : #E23D3D (rouge)
• Texte : #111827 (noir)
• Fond : #F7F5F2 (beige clair)

TYPOGRAPHIE
• Famille : Inter, Arial, sans-serif
• H1 : 40px / 700
• H2 : 32px / 700
• H3 : 24px / 600
• Body : 16px / 400
• Label : 14px / 500
• Caption : 12px / 500

SPACING (échelle 4px)
• xs : 4px
• sm : 8px
• md : 16px
• lg : 24px
• xl : 32px
• xxl : 48px
• xxxl : 64px

RAYONS
• sm : 12px
• md : 20px
• lg : 28px

OMBRES
• soft : 0 12px 30px rgba(17, 25, 39, 0.05)
• strong : 0 24px 80px rgba(17, 25, 39, 0.08)

════════════════════════════════════════════════════════════════

INSTALLATION & LANCEMENT

# Installation

npm install

# Développement (avec node --watch)

npm run dev

# Production

npm start

# Accès

http://localhost:3000

════════════════════════════════════════════════════════════════

FICHIERS ESSENTIELS À CONSULTER

1. README.md - Instructions complètes et structure
2. IMPLEMENTATION.md - Checklist des livrables
3. /docs/designSystem.md - Maquette et design system complet
4. app.js - Configuration Express et routage
5. /src/views/layouts/base.html.twig - Structure principale
6. /public/css/variables.css - Toutes les variables du DS

════════════════════════════════════════════════════════════════

✅ PRÊT À DÉVELOPPER

La structure est complète et respecte :
✓ Design System (maquette + charte graphique)
✓ Architecture Express + Twig monobloc
✓ Conventions ARCHITECTURE.md
✓ Responsive design (mobile-first)
✓ CSS pur sans dépendances externes
✓ JavaScript vanilla
✓ HTML sémantique
✓ Twig modulaire et réutilisable

════════════════════════════════════════════════════════════════
