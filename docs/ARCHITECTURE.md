# ARCHITECTURE.md — Time Tracker
> Document de référence interne. Mis à jour à chaque évolution structurelle du projet.

---

## 1. Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Runtime | Node.js (Krypton LTS) | 24.15.0 |
| Framework HTTP | Express | 4.19.2 |
| ORM | Prisma | 7.4.2 |
| Templates | Twig.js | 3.8.0 |
| Base de données | MySQL | 8.4.0 GA |
| Frontend | HTML5 / CSS3 / JS vanilla | ES2022+ |
| Validation | Joi **ou** Zod (choisir une fois) | — |
| Logger | Winston ou Pino | — |
| Tests | Jest + Supertest | 29+ |
| Linter | ESLint (Airbnb-base) + Prettier | — |

**Normes générales**
- `'use strict'` activé dans tous les fichiers
- Style de modules unifié : ESM **ou** CommonJS — ne jamais mélanger
- Utiliser les API natives Node.js >= 24 (fetch, crypto…) sans polyfills superflus
- Variables d'environnement exclusivement dans `.env` (jamais committé)

---

## 2. Conventions de code

### Naming

| Élément | Convention | Exemple |
|---|---|---|
| Fichiers | kebab-case | `time-entry.service.js` |
| Classes | PascalCase | `TimeEntryRepository` |
| Fonctions / variables | camelCase | `getActiveSession` |
| Constantes globales | SCREAMING_SNAKE_CASE | `MAX_IDLE_DURATION` |
| Routes Express | kebab-case, pluriel | `/api/v1/time-entries` |
| Templates Twig | kebab-case | `timer-widget.html.twig` |
| Modèles Prisma | PascalCase singulier | `TimeEntry`, `UserSession` |
| Champs Prisma | camelCase | `startedAt`, `userId` |

### Structure
- **1 responsabilité par fichier**
- Max **150 lignes** par fichier (hors tests)
- Max **30 lignes** par fonction
- Imports triés : natifs Node → packages tiers → modules internes

### Commentaires
- JSDoc obligatoire sur toutes les fonctions publiques et méthodes de service
- Commentaires inline uniquement pour les logiques non-évidentes
- Pas de TODO sans ticket associé en production

---

## 3. Architecture

### Structure de dossiers

```
src/
├── config/           # Configuration app, env, Prisma client singleton
├── routes/           # Déclaration des routes Express uniquement
├── controllers/      # Orchestration requête → service → réponse
├── services/         # Logique métier (tracking, agrégations, calculs)
├── repositories/     # Accès base de données via Prisma
├── middlewares/      # Auth, validation, gestion d'erreurs globale
├── validators/       # Schémas Joi/Zod par ressource
├── utils/            # Fonctions utilitaires pures (sans effets de bord)
├── events/           # EventEmitter / SSE pour les mises à jour temps réel
└── views/            # Templates Twig
    ├── layouts/      # Templates de base (base.html.twig)
    ├── pages/        # Pages complètes (dashboard.html.twig)
    ├── components/   # Composants réutilisables (timer-widget.html.twig)
    └── partials/     # Fragments inclus (navbar.html.twig)

prisma/
├── schema.prisma
└── migrations/

tests/
├── unit/
└── integration/
```

### Règles de flux

```
Requête HTTP
    → routes/         (déclaration uniquement, aucune logique)
    → controllers/    (orchestration, pas de logique métier)
    → services/       (toute la logique métier)
    → repositories/   (accès Prisma uniquement)
    → Base de données
```

- Les dépendances sont **uniquement descendantes**
- Les events/ sont appelés depuis les services après une mutation d'état
- Le PrismaClient est instancié une seule fois dans `src/config/prisma.js`

---

## 4. API REST

### Conventions
- Préfixe : `/api/v1/`
- Ressources au pluriel : `/api/v1/sessions`, `/api/v1/time-entries`
- Verbes HTTP sémantiques : GET, POST, PUT, PATCH, DELETE
- Codes HTTP stricts : `200`, `201`, `204`, `400`, `401`, `403`, `404`, `409`, `422`, `500`

### Format de réponse unifié

```json
// Succès
{ "success": true, "data": {}, "meta": {} }

// Erreur
{ "success": false, "error": { "code": "SESSION_ALREADY_ACTIVE", "message": "...", "details": [] } }
```

### Gestion d'erreurs
- Classe `AppError` personnalisée (`statusCode`, `code`, `message`)
- Middleware d'erreur global branché en dernier dans Express
- Toutes les fonctions async wrappées dans `asyncHandler()` — aucun try/catch répété dans les routes
- Stack trace et détails Prisma jamais exposés en production

### Validation
- Tout `req.body`, `req.params`, `req.query` validé par un schéma Joi/Zod avant d'atteindre le controller
- Validation centralisée via les middlewares `validateBody()`, `validateParams()`, `validateQuery()`

---

## 5. Base de données

### Prisma
- `PrismaClient` : singleton dans `src/config/prisma.js`
- Tous les accès Prisma encapsulés dans les repositories — aucun accès direct ailleurs
- Chaque modèle doit avoir : `id`, `createdAt`, `updatedAt`
- Champs sensibles (`token`, `passwordHash`) exclus des `select` par défaut

### Migrations
- **Jamais** `prisma db push` sur un environnement partagé ou production
- Toujours `prisma migrate dev --name <nom_explicite>` en développement
- Toujours `prisma migrate deploy` en production
- Seeds dans `prisma/seed.js`, séparés des migrations

### Règles de requêtes
- Aucune requête N+1 : utiliser `include` et `select` avec discernement
- Index explicites sur toutes les colonnes utilisées en filtre ou tri fréquent
- Transactions Prisma obligatoires pour toute opération impliquant plusieurs tables

---

## 6. Templates Twig

### Conventions
- Tout template étend un layout via `{% extends %}`
- Les composants sont **isolés** : ils ne dépendent que des variables passées explicitement via `{% include with {} %}`
- Variables en camelCase dans les templates : `{{ activeSession.duration }}`
- Aucune logique métier dans les templates (calculs complexes → service/controller)
- Filtres Twig custom définis dans `src/config/twig.js`
- `autoescape: true` activé — `| raw` interdit sauf exception documentée et justifiée

### Données
- Le controller ne passe aux templates que les données strictement nécessaires
- Les données temps réel (timers actifs) sont injectées côté client via SSE ou fetch — jamais via rendu serveur

---

## 7. Tests

### Stack
- **Jest v29+** pour les tests unitaires et d'intégration
- **Supertest** pour tester les routes Express sans démarrer le serveur

### Couverture minimale

| Couche | Seuil |
|---|---|
| Services | 85% |
| Repositories | 70% |
| Controllers | 70% |
| Utils | 100% |
| **Global** | **80% avant toute PR** |

### Conventions
- 1 fichier de test par fichier source : `time-entry.service.test.js`
- Structure **AAA** obligatoire : Arrange / Act / Assert
- Nommage : `"should [comportement attendu] when [condition]"`
- Mocks uniquement via `jest.mock()` ou injection de dépendances
- Aucun appel réseau réel en tests unitaires (Prisma mocké)
- Les tests d'intégration utilisent une base dédiée (`.env.test`)

### Scripts npm
```
npm test              → tous les tests
npm run test:unit     → tests unitaires uniquement
npm run test:cov      → rapport de couverture complet
```

---

## 8. Git & Commits

### Conventional Commits

| Préfixe | Usage |
|---|---|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction de bug |
| `refactor:` | Refactoring sans changement de comportement |
| `chore:` | Maintenance (deps, config, scripts) |
| `docs:` | Documentation uniquement |
| `test:` | Ajout ou modification de tests |
| `perf:` | Amélioration de performance |
| `style:` | Formatage, lint (sans logique) |
| `ci:` | Modification des pipelines CI/CD |

**Exemples valides**
```
feat(tracker): add idle detection based on mouse inactivity
fix(session): prevent duplicate active sessions for same user
refactor(repository): extract base repository class
```

### Branches

| Branche | Usage |
|---|---|
| `main` | Production stable |
| `develop` | Intégration continue |
| `feat/xxx` | Nouvelles fonctionnalités |
| `fix/xxx` | Corrections de bugs |
| `chore/xxx` | Maintenance |

**Règles**
- Aucun commit direct sur `main` ou `develop`
- Toute PR doit passer les tests (CI) et une revue de code
- 1 commit = 1 unité logique — pas de `wip` ni `misc fixes`

---

## 9. Interdictions absolues

- `console.log` / `console.error` → utiliser le logger configuré
- Logique métier dans controllers, routes ou templates Twig
- Appels Prisma directs en dehors de `repositories/`
- Secrets, tokens ou credentials dans le code source
- Code mort, code commenté ou code dupliqué laissé en place
- Mélange ESM + CommonJS dans le même projet
- Stack trace ou détails internes Prisma dans les réponses API en production
- `try/catch` répété dans les routes → utiliser `asyncHandler`
- `prisma db push` sur un environnement partagé ou de production
- Sessions, tokens ou entrées orphelines sans nettoyage planifié

---

## 10. Contexte métier — Time Tracker

### Modèles principaux

**Session**
Représente une période de travail.
- Champs clés : `startedAt`, `endedAt`, `status` (`active | paused | closed`)
- Une seule session active par utilisateur à la fois

**TimeEntry**
Représente un segment de temps catégorisé au sein d'une session.
- Catégories : `coding | web | communication | idle`
- Lié à une session par `sessionId`

### Règles métier
- La détection d'inactivité (`idle`) repose sur des événements système (souris, clavier), remontés côté client
- Les agrégations (total par catégorie, par jour, par projet) sont calculées côté service — jamais dans les requêtes Prisma brutes
- Les mises à jour en temps réel utilisent **SSE** (Server-Sent Events) via `events/`
- L'état du timer actif est **toujours persisté en base** pour permettre la récupération après reconnexion
- Un timer interrompu (crash, déconnexion) doit pouvoir être repris ou clôturé proprement au prochain démarrage
