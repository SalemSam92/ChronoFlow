# PRD.md — Product Requirements Document
## ChronoFlow— Suivi de temps en temps réel

> **Version** : 1.0.0
> **Statut** : Draft
> **Dernière mise à jour** : 2025
> **Auteur** : —
> **Stack de référence** : voir `ARCHITECTURE.md`

---

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Objectifs produit](#2-objectifs-produit)
3. [Utilisateurs cibles](#3-utilisateurs-cibles)
4. [Périmètre fonctionnel](#4-périmètre-fonctionnel)
5. [User Stories](#5-user-stories)
6. [Spécifications fonctionnelles détaillées](#6-spécifications-fonctionnelles-détaillées)
7. [Modèle de données](#7-modèle-de-données)
8. [API — Endpoints](#8-api--endpoints)
9. [Règles métier](#9-règles-métier)
10. [Exigences non fonctionnelles](#10-exigences-non-fonctionnelles)
11. [Hors périmètre (v1)](#11-hors-périmètre-v1)
12. [Critères d'acceptation globaux](#12-critères-dacceptation-globaux)

---

## 1. Vue d'ensemble

**Time Tracker** est une application web de suivi de temps en temps réel destinée aux développeurs et travailleurs autonomes souhaitant mesurer précisément comment leur temps est réparti au cours d'une session de travail.

L'application catégorise automatiquement le temps passé en quatre grandes familles :
- **Coding** — éditeurs de code, terminaux, IDE
- **Web** — navigation, recherche, documentation en ligne
- **Communication** — messageries, e-mail, visioconférence
- **Idle** — inactivité détectée (aucune interaction clavier/souris)

L'objectif est de fournir des **insights actionnables** sur la productivité réelle, sans friction pour l'utilisateur.

---

## 2. Objectifs produit

| # | Objectif | Indicateur de succès |
|---|---|---|
| O1 | Capturer le temps de travail sans intervention manuelle | Session démarrée en 1 clic, catégorisation automatique |
| O2 | Fournir une vision en temps réel de la session en cours | Latence d'affichage < 2 secondes via SSE |
| O3 | Permettre l'analyse rétrospective par jour / semaine / projet | Tableau de bord avec filtres et agrégations |
| O4 | Détecter et enregistrer les périodes d'inactivité | Seuil configurable, détection clavier + souris |
| O5 | Garantir la cohérence des données même en cas de déconnexion | État persisté en base, reprise automatique au redémarrage |

---

## 3. Utilisateurs cibles

### Persona principal — Le développeur solo
- Travaille sur plusieurs projets en parallèle
- Veut facturer ses clients au temps réel passé
- Perd souvent le fil entre coding, recherche et réunions
- N'a pas le temps de saisir manuellement chaque changement d'activité

### Persona secondaire — Le freelance généraliste
- Designer, rédacteur, consultant
- Veut identifier ses pertes de temps (idle, réseaux sociaux)
- Génère des rapports pour ses clients ou sa comptabilité

---

## 4. Périmètre fonctionnel

### v1 — Inclus

| Module | Description |
|---|---|
| **Authentification** | Inscription, connexion, déconnexion (session HTTP) |
| **Gestion de projets** | Créer, renommer, archiver un projet |
| **Sessions de travail** | Démarrer, mettre en pause, reprendre, clôturer |
| **Catégorisation automatique** | Détection du type d'activité via l'onglet actif (agent JS côté client) |
| **Détection d'inactivité** | Seuil configurable (défaut : 3 min sans interaction) |
| **Affichage temps réel** | Timer live via SSE, mise à jour de la catégorie courante |
| **Tableau de bord** | Vue journalière avec répartition par catégorie |
| **Historique** | Liste des sessions passées avec détail des entrées |
| **Rapports** | Agrégations par projet, par catégorie, par période |

### v2 — Prévu (hors périmètre v1)

- Export PDF / CSV des rapports
- Intégration calendrier (Google Calendar, Outlook)
- Application desktop (Electron) pour une détection système plus précise
- API publique pour intégrations tierces
- Mode équipe / multi-utilisateurs

---

## 5. User Stories

### Authentification

| ID | Story | Priorité |
|---|---|---|
| US-01 | En tant qu'utilisateur, je veux créer un compte avec e-mail et mot de passe | Must |
| US-02 | En tant qu'utilisateur, je veux me connecter et rester authentifié entre les visites | Must |
| US-03 | En tant qu'utilisateur, je veux pouvoir me déconnecter | Must |

### Projets

| ID | Story | Priorité |
|---|---|---|
| US-04 | En tant qu'utilisateur, je veux créer un projet nommé pour y rattacher mes sessions | Must |
| US-05 | En tant qu'utilisateur, je veux renommer ou archiver un projet | Should |
| US-06 | En tant qu'utilisateur, je veux voir la liste de mes projets actifs | Must |

### Sessions

| ID | Story | Priorité |
|---|---|---|
| US-07 | En tant qu'utilisateur, je veux démarrer une session sur un projet en un clic | Must |
| US-08 | En tant qu'utilisateur, je veux mettre en pause et reprendre une session | Must |
| US-09 | En tant qu'utilisateur, je veux clôturer une session manuellement | Must |
| US-10 | En tant qu'utilisateur, je veux que ma session soit automatiquement récupérée si je ferme le navigateur | Must |
| US-11 | En tant qu'utilisateur, je ne veux pas pouvoir démarrer deux sessions en parallèle | Must |

### Tracking en temps réel

| ID | Story | Priorité |
|---|---|---|
| US-12 | En tant qu'utilisateur, je veux voir le timer de ma session en cours se mettre à jour en direct | Must |
| US-13 | En tant qu'utilisateur, je veux voir la catégorie d'activité actuelle (coding, web, etc.) | Must |
| US-14 | En tant qu'utilisateur, je veux que les périodes d'inactivité soient détectées et catégorisées automatiquement | Must |
| US-15 | En tant qu'utilisateur, je veux pouvoir corriger manuellement une catégorie sur une entrée passée | Should |
| US-16 | En tant qu'utilisateur, je veux configurer le seuil de détection d'inactivité (entre 1 et 30 min) | Should |

### Tableau de bord & rapports

| ID | Story | Priorité |
|---|---|---|
| US-17 | En tant qu'utilisateur, je veux voir la répartition de ma journée actuelle par catégorie | Must |
| US-18 | En tant qu'utilisateur, je veux consulter l'historique de mes sessions passées | Must |
| US-19 | En tant qu'utilisateur, je veux filtrer mes rapports par projet et par période | Should |
| US-20 | En tant qu'utilisateur, je veux voir le total de temps par catégorie sur une semaine | Should |

---

## 6. Spécifications fonctionnelles détaillées

### 6.1 Authentification

- Inscription : e-mail unique + mot de passe (min. 8 caractères, hashé en bcrypt)
- Connexion : session HTTP sécurisée (`httpOnly`, `secure`, `sameSite`)
- Pas de OAuth v1 (prévu v2)
- Mot de passe oublié : hors périmètre v1

### 6.2 Gestion des sessions de travail

**États d'une session**
```
[non démarrée]
      ↓ start
   active ──── pause ──→ paused
      ↑                     ↓ resume
      └─────────────────────┘
      ↓ stop (depuis active ou paused)
   closed
```

- Une seule session `active` ou `paused` par utilisateur à la fois
- La clôture d'une session calcule et stocke la durée totale
- Si une session `active` existe au démarrage de l'application → proposer de la reprendre ou de la clôturer

### 6.3 Catégorisation automatique

Le client JavaScript surveille le titre et l'URL de l'onglet actif (via l'API `document.title` et `window.location`) et envoie des événements de changement d'activité au serveur.

**Règles de catégorisation (priorité décroissante)**

| Catégorie | Domaines / patterns détectés |
|---|---|
| `coding` | `localhost`, `github.com`, `gitlab.com`, `vscode.dev`, extensions `.js .ts .py .php` |
| `communication` | `discord.com`, `slack.com`, `mail.google.com`, `outlook.live.com`, `teams.microsoft.com` |
| `web` | Tout autre domaine HTTP/HTTPS |
| `idle` | Aucune interaction clavier/souris pendant `idleThreshold` secondes |

- La catégorie `idle` est prioritaire sur toutes les autres dès que le seuil est atteint
- Les règles de catégorisation sont extensibles (table de configuration en base)

### 6.4 Détection d'inactivité

- Événements surveillés : `mousemove`, `keydown`, `mousedown`, `touchstart`
- Seuil par défaut : **180 secondes** (3 minutes), configurable par l'utilisateur (60s–1800s)
- À l'atteinte du seuil : création d'un `TimeEntry` de type `idle` avec `startedAt = dernière interaction`
- Au retour d'activité : clôture de l'entrée `idle` et création d'une nouvelle entrée dans la catégorie détectée

### 6.5 Temps réel (SSE)

- Endpoint : `GET /api/v1/sessions/current/stream`
- Le serveur envoie un événement toutes les **5 secondes** avec :
  - durée totale de la session en cours
  - catégorie active actuelle
  - durée de la catégorie active
- La connexion SSE est automatiquement rétablie côté client (`EventSource` avec retry)

### 6.6 Tableau de bord

- Vue par défaut : **aujourd'hui**
- Graphique de répartition : camembert ou barres horizontales par catégorie
- Timeline de la journée : blocs colorés représentant les entrées successives
- Indicateurs : total travaillé, % par catégorie, plus longue session, temps idle total

---

## 7. Modèle de données

### User
```
id            String   @id @default(cuid())
email         String   @unique
passwordHash  String
idleThreshold Int      @default(180)   // secondes
createdAt     DateTime @default(now())
updatedAt     DateTime @updatedAt
sessions      Session[]
projects      Project[]
```

### Project
```
id        String   @id @default(cuid())
name      String
status    String   @default("active")  // active | archived
userId    String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
sessions  Session[]
```

### Session
```
id          String      @id @default(cuid())
status      String      // active | paused | closed
startedAt   DateTime
endedAt     DateTime?
pausedAt    DateTime?
totalSeconds Int        @default(0)
userId      String
projectId   String
createdAt   DateTime    @default(now())
updatedAt   DateTime    @updatedAt
entries     TimeEntry[]
```

### TimeEntry
```
id         String   @id @default(cuid())
category   String   // coding | web | communication | idle
startedAt  DateTime
endedAt    DateTime?
durationSeconds Int @default(0)
sessionId  String
createdAt  DateTime @default(now())
updatedAt  DateTime @updatedAt
```

### CategoryRule *(extensibilité)*
```
id        String  @id @default(cuid())
pattern   String  // ex: "github.com"
category  String  // coding | web | communication
priority  Int     @default(0)
createdAt DateTime @default(now())
```

---

## 8. API — Endpoints

### Authentification

| Méthode | Route | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Créer un compte |
| POST | `/api/v1/auth/login` | Connexion |
| POST | `/api/v1/auth/logout` | Déconnexion |
| GET | `/api/v1/auth/me` | Profil utilisateur courant |

### Projets

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/projects` | Lister les projets de l'utilisateur |
| POST | `/api/v1/projects` | Créer un projet |
| PATCH | `/api/v1/projects/:id` | Renommer ou archiver |
| DELETE | `/api/v1/projects/:id` | Supprimer (soft delete) |

### Sessions

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/sessions` | Historique des sessions |
| GET | `/api/v1/sessions/current` | Session active ou en pause |
| POST | `/api/v1/sessions` | Démarrer une session |
| PATCH | `/api/v1/sessions/:id/pause` | Mettre en pause |
| PATCH | `/api/v1/sessions/:id/resume` | Reprendre |
| PATCH | `/api/v1/sessions/:id/stop` | Clôturer |
| GET | `/api/v1/sessions/:id` | Détail d'une session |
| GET | `/api/v1/sessions/current/stream` | Flux SSE temps réel |

### Entrées de temps

| Méthode | Route | Description |
|---|---|---|
| POST | `/api/v1/time-entries` | Créer une entrée (événement client) |
| PATCH | `/api/v1/time-entries/:id` | Corriger une catégorie |
| GET | `/api/v1/sessions/:id/entries` | Entrées d'une session |

### Rapports

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/v1/reports/daily` | Agrégation du jour (`?date=YYYY-MM-DD`) |
| GET | `/api/v1/reports/weekly` | Agrégation de la semaine |
| GET | `/api/v1/reports/by-project` | Agrégation par projet (`?projectId=`) |

### Paramètres utilisateur

| Méthode | Route | Description |
|---|---|---|
| PATCH | `/api/v1/users/me/settings` | Modifier `idleThreshold` et préférences |

---

## 9. Règles métier

| ID | Règle |
|---|---|
| RG-01 | Un utilisateur ne peut avoir qu'une seule session `active` ou `paused` à la fois |
| RG-02 | Une session `closed` est immuable — aucune modification possible |
| RG-03 | Une entrée `idle` est créée rétroactivement : `startedAt` = dernière interaction connue |
| RG-04 | Deux entrées consécutives de même catégorie sont fusionnées si l'écart est < 10 secondes |
| RG-05 | Le `totalSeconds` d'une session est recalculé à chaque clôture d'entrée (pas en temps réel) |
| RG-06 | Au démarrage, si une session `active` existe depuis > 8h sans interaction → la clôturer automatiquement |
| RG-07 | Les agrégations de rapport excluent les sessions `active` et `paused` en cours |
| RG-08 | La suppression d'un projet archive ses sessions mais ne supprime aucune donnée |
| RG-09 | Le seuil d'inactivité est propre à chaque utilisateur (table `User.idleThreshold`) |
| RG-10 | Une entrée sans `endedAt` ne peut exister que pour la session active courante |

---

## 10. Exigences non fonctionnelles

### Performance
- Temps de réponse API < **200ms** au P95 (hors agrégations complexes)
- Agrégations de rapport < **1 seconde** pour un historique de 90 jours
- Flux SSE : événement envoyé toutes les **5 secondes**, connexion maintenue sans polling

### Disponibilité
- Cible : **99,5%** uptime en production
- Récupération après crash : état de la session toujours restaurable depuis la base

### Sécurité
- Authentification par session HTTP (`httpOnly`, `secure`, `sameSite=strict`)
- Mots de passe hashés en **bcrypt** (cost factor ≥ 12)
- Toutes les routes protégées par un middleware `requireAuth`
- Aucune donnée d'un utilisateur accessible par un autre (isolation stricte par `userId`)
- Rate limiting sur les endpoints d'authentification (max 10 req/min par IP)

### Accessibilité
- Interface navigable au clavier
- Contrastes WCAG AA sur les éléments critiques (timer, statut de session)

### Compatibilité navigateurs
- Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- Pas de support IE

---

## 11. Hors périmètre (v1)

- Export PDF / CSV
- Application mobile ou desktop
- Intégration OAuth (Google, GitHub)
- Webhooks / API publique
- Gestion multi-utilisateurs / équipes
- Notifications push ou e-mail
- Facturation ou génération de devis
- Synchronisation multi-onglets (un seul onglet actif par session)

---

## 12. Critères d'acceptation globaux

| ID | Critère |
|---|---|
| CA-01 | Un utilisateur peut démarrer une session, travailler, et voir le timer se mettre à jour sans recharger la page |
| CA-02 | Les catégories `coding`, `web`, `communication`, `idle` sont correctement détectées et enregistrées |
| CA-03 | Une session interrompue (fermeture navigateur) est récupérée intacte à la reconnexion |
| CA-04 | Le tableau de bord affiche la répartition correcte du jour avec les bonnes durées |
| CA-05 | Deux sessions simultanées pour le même utilisateur sont impossibles (réponse 409) |
| CA-06 | Toutes les routes API retournent le format de réponse unifié `{ success, data/error }` |
| CA-07 | La couverture de tests globale est ≥ 80% avant toute mise en production |
| CA-08 | Aucun secret ou credential n'est exposé dans les réponses API ou les logs |