# ChronoFlow — Design System & Maquette d’application

## 1. Introduction

Ce document formalise le design system de ChronoFlow et la maquette fonctionnelle complète de l’application, en respectant les visuels de référence présents dans le workspace.

Il couvre :

- charte graphique complète
- typographie et spacing
- système de layout et grille
- composants UI détaillés
- structure des écrans
- navigation et interactions visibles

---

## 2. Charte graphique

### 2.1 Palette de couleurs

Couleurs primaires

- `--color-primary`: #FF8123 (orange principal)
- `--color-primary-dark`: #E76A11
- `--color-primary-soft`: #FFF1E6

Couleurs secondaires

- `--color-secondary`: #4B8AFF (bleu dynamique)
- `--color-secondary-soft`: #E7F0FF
- `--color-success`: #2EBF7F
- `--color-warning`: #F2A54C
- `--color-danger`: #E23D3D

Neutres

- `--color-bg`: #F7F5F2
- `--color-surface`: #FFFFFF
- `--color-surface-soft`: #F2ECE6
- `--color-border`: #E3D8CE
- `--color-text-primary`: #111827
- `--color-text-secondary`: #4B5563
- `--color-text-muted`: #9CA3AF
- `--color-disabled`: #B7BAC1

États

- `--color-info`: #4B8AFF
- `--color-surface-inverse`: #111827

### 2.2 Typographie

Police principale

- Famille : Inter, Arial, sans-serif
- Line-height global : 1.45
- Texte par défaut : 16px

Titres

- `--font-h1`: 40px / 48px, 700
- `--font-h2`: 32px / 36px, 700
- `--font-h3`: 24px, 600
- `--font-h4`: 20px, 600

Texte

- `--font-body`: 16px, 400
- `--font-body-strong`: 16px, 600
- `--font-label`: 14px, 500
- `--font-caption`: 12px, 500

### 2.3 Spacing system

Échelle de base (4px)

- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-xxl`: 48px
- `--space-xxxl`: 64px

### 2.4 Bordures, ombres, formes

Rayons

- `--radius-sm`: 12px
- `--radius-md`: 20px
- `--radius-lg`: 28px

Ombres

- `--shadow-soft`: 0 12px 30px rgba(17, 25, 39, 0.05)
- `--shadow-strong`: 0 24px 80px rgba(17, 25, 39, 0.08)

Bordures

- `--border-light`: 1px solid #E3D8CE
- `--border-transparent`: 1px solid transparent

---

## 3. Grille et layout

### 3.1 Structure de layout

- Layout principal : sidebar gauche fixe + en-tête top + contenu principal droit
- Grille desktop : 12 colonnes, gutter 24px
- Marges globales : 32px sur desktop
- Points de rupture
  - Mobile : < 768px
  - Tablette : 768px–1024px
  - Desktop : > 1024px

### 3.2 Organisation responsive

- Mobile : colonne unique, sidebar en drawer
- Tablette : colonnes empilées, header plus compact
- Desktop : 2 à 3 colonnes, panneau latéral droit possible pour widgets secondaires

### 3.3 Principes d’alignement

- Alignement principal à gauche pour le texte
- Alléger les sections avec suffisamment de padding intérieur
- Maintenir une hiérarchie claire entre titres, cartes et CTA

---

## 4. Composants UI

### 4.1 Boutons

Bouton primaire

- Fond : `--color-primary`
- Texte : #FFFFFF
- Rayons : `--radius-sm`
- Ombre : `--shadow-soft`
- Hover : `--color-primary-dark`

Bouton secondaire

- Fond : `--color-surface`
- Texte : `--color-primary`
- Bordure : `--border-light`
- Hover : fond `--color-primary-soft`

Bouton ghost

- Fond transparent
- Texte : `--color-text-primary`
- Hover : fond `--color-surface-soft`

Bouton disabled

- Fond : `--color-disabled`
- Texte : #FFFFFF
- Curseur : not-allowed

### 4.2 Champs de formulaire

Input standard

- Fond : `--color-surface`
- Bordure : `--border-light`
- Texte : `--color-text-primary`
- Placeholder : `--color-text-muted`
- Focus : bordure `--color-primary`, shadow faible

Select et textarea

- Styles semblables à l’input
- Option active : `--color-primary-soft`

Toggle

- Track off : #E7E2DD
- Track on : `--color-primary-soft`
- Thumb : #FFFFFF
- Shadow thumb : 0 2px 8px rgba(17, 25, 39, 0.08)

Checkbox / radio

- Cercle / case bordée en gris
- Case cochée : fond `--color-primary`
- Focus : anneau `--color-secondary`

### 4.3 Cartes et panneaux

Card standard

- Fond : `--color-surface`
- Padding : `--space-lg`
- Radius : `--radius-md`
- Shadow : `--shadow-soft`

Card compacte

- Padding : `--space-md`
- Hauteur minimale : 112px

Panel secondaire

- Fond : `--color-surface-soft`
- Bordure : `--border-light`
- Radius : `--radius-md`

### 4.4 Sidebar

- Fond : `--color-surface`
- Largeur : 280px sur desktop
- Items : 20px icon + label
- Item actif : fond `--color-primary-soft`, texte `--color-primary`, bord gauche accent orange
- CTA principal : bouton `--primary`
- Section secondaire en bas pour les actions non critiques

### 4.5 Header

- Hauteur : 84px
- Fond : transparent sur le contenu principal
- Eléments : titre, recherche, notifications, avatar
- Séparateur bas : `--border-light`

### 4.6 Widgets spécifiques

Timer widget

- Cercle central avec texte très large
- Texte du temps : 56px, 700
- Sous-texte : 14px, 500
- Boutons d’action alignés horizontalement

Timeline

- Barre horizontale ou verticale segmentée
- Couleurs de segment définies par catégorie
- Etiquettes : `Coding`, `Web`, `Communication`, `Idle`

Stats card

- Bloc titre + grande métrique + petit label
- Variation : badge de tendance en vert ou en bleu

Graphiques

- Camembert à motif doux, adaptation en `--color-primary`, `--color-secondary`, `--color-success`, `--color-warning`
- Barres horizontales épurées, coins arrondis, fond `--color-surface-soft`
- Lignes de temps en style bandeau coloré

### 4.7 Icônes

- Style : stroke rounded, forme nette
- Tailles
  - Navbar / sidebar : 20px
  - Cards / boutons : 16px
  - Tags / labels : 14px

Couleurs

- `--color-icon-default`: #4B5563
- `--color-icon-active`: `--color-primary`
- `--color-icon-muted`: `--color-text-muted`

---

## 5. Structure de navigation

### 5.1 Navigation principale

- Dashboard
- Focus
- Historique
- Statistiques
- Paramètres

La navigation principale est une sidebar verticale fixe sur desktop, transformée en drawer sur mobile.

### 5.2 Navigation secondaire

- Fil d’Ariane léger pour sections imbriquées
- Tabs dans `Paramètres`
- Filtre et tri dans `Historique` et `Statistiques`

### 5.3 Interaction

- Hover sur item : fond clair, texte plus sombre
- Etat actif : accent orange, indicator visible
- Transitions fluides : 180ms ease-out

---

## 6. Pages et wireframes détaillés

### 6.1 Dashboard

Structure

- Sidebar gauche
- Header supérieur
- Contenu principal en 2 colonnes sur desktop

Sections

1. En-tête de page
   - Titre : "Bonjour, [Prénom]."
   - Sous-texte : "Concentrez-vous sur vos 3 priorités du jour."

2. Objectifs du jour
   - Card large
   - Liste de tâches avec checkbox, durée estimée, tag priorité
   - Exemple d’item : "Documentation du Design System — 2h"

3. Progrès récents
   - Card contenant un tableau simple
   - Colonnes : Activité, Projet, Temps, Statut

4. Calendrier + suivi
   - Mini calendrier compact
   - Carte latérale "À suivre" avec 2 actions prochaines

5. Indicateurs KPI
   - Cards 3 colonnes : Focus total, Tâches terminées, Série actuelle
   - Graphique de type barre pour "Heures de Focus"
   - Camembert de répartition par type de travail

Wireframe desktop

- Gauche : objectifs du jour + progrès récents
- Droite : calendrier + suivi + KPI
- Bas : tableau d’historique complet

### 6.2 Focus

Structure

- Page centrée sur une session active
- Zone centrale dominante pour le timer
- Panneau latéral droit pour résumé et prochaines actions

Sections

1. Banniere de session
   - Badge d’état : "Session de Focus active"
   - Timer circulaire : temps restant / écoulé

2. Contrôles
   - Boutons : Pause, Terminer la session
   - Action principal en orange

3. Liste de tâches
   - Cards de sous-tâches avec checkbox
   - Chaque tâche : statut, durée, note

4. Objectif journalier
   - Card : "4/5 sessions de Focus"

Wireframe

- Timer en haut centre
- Actions en dessous
- Liste en bas avec cartes dans une colonne large
- Panneau droit sur desktop pour résumé et contexte

### 6.3 Historique

Structure

- Page full-width
- Barre de filtre en haut
- Liste verticale de sessions groupées par date

Sections

1. Header
   - Titre : "Historique"
   - Filtre : projet, catégorie, période

2. Liste de sessions
   - Carte par session
   - Détails : titre, projet, durée, plage horaire, badge statut
   - Action : "Voir détails"

3. Groupe temporel
   - Séparateurs : Aujourd’hui, Hier, Cette semaine

Wireframe

- Barre de filtre en top
- Liste de cartes alignée en colonne
- Carte de session large avec info claire

### 6.4 Statistiques

Structure

- Page analytique composées de cards KPI et graphiques

Sections

1. Top KPI
   - Cards : Focus total, Tâches terminées, Série actuelle
   - Chaque card affiche un petit pourcentage de variation

2. Graphiques principaux
   - Barre : Heures de Focus par jour
   - Camembert : Répartition par type de travail

3. Insight
   - Card texte : suggestion actionable
   - Bouton : "Optimiser"

4. Actions
   - Selecteur de période : "Ce mois-ci"
   - Bouton "Exporter"

Wireframe

- En haut : 3 KPI côte à côte
- Milieu : graphique barre + graphique camembert
- Bas : insight full-width

### 6.5 Paramètres

Structure

- Layout 2 colonnes : menu onglets à gauche, contenu à droite

Sections

1. Onglets
   - Profil
   - Espace de travail
   - Notifications
   - Facturation

2. Profil
   - Avatar circulaire
   - Champs : nom, e-mail, biographie
   - Bouton : Enregistrer les modifications

3. Apparence
   - Cartes de type radio : Clair, Sombre, Système

4. Action critique
   - Bouton : Désactiver le compte (rouge)

Wireframe

- Menu onglets gauche
- Formulaire détaillé à droite
- Section apparence visible en bas du contenu

### 6.6 Authentification

Structure

- Page simple, card centrale
- Zone de support login/signup

Sections

1. Entête de la page
   - Logo + nom ChronoFlow
   - Sous-texte : "Concentrez-vous sur l’essentiel."

2. Méthodes de connexion
   - Boutons Google et GitHub

3. Formulaire
   - E-mail, mot de passe
   - Bouton "Se connecter"
   - Lien : "Créer un espace"

Wireframe

- Page en split ou centered card
- Fond clair, card blanche avec ombre
- CTA orange très visible

---

## 7. Interactions visibles

### Hover et focus

- Buttons : transition 180ms, couleur plus sombre sur hover
- Cards : légère élévation et bordure accentuée
- Inputs : ring orange au focus
- Items nav : arrière-plan doux et icon coloré

### Feedback

- Toast action : fond sombre sur texte blanc
- Messages d’état : succès vert, erreur rouge
- Indicateurs temps réel : pulsation légère sur le timer actif

### États vides

- Illustrations simples et scéniques
- Texte guide et CTA principal
- Exemple : "Aucune session active pour le moment. Démarrez votre première session."

---

## 8. Principe de cohérence

- Respect strict des couleurs définies
- Utilisation permanente de l’échelle de spacing 4px
- Hiérarchie typographique claire et constante
- Architectures de pages basées sur les maquettes du workspace
- Composants réutilisables et alignés visuellement

---

## 9. Résumé de la maquette complète

ChronoFlow se compose de :

- un dashboard de suivi quotidien
- une page focus centrée sur la session active
- un historique de sessions passé
- une page statistiques pour analyser les tendances
- un espace paramètres pour personnaliser l’expérience

Chaque écran utilise

- une sidebar de navigation simple
- une palette orange / blanc / gris / bleu cohérente
- des cartes généreuses, des boutons visibles, et des états clairs
- un style minimaliste mais chaleureux

Cette maquette est prête à être utilisée comme base UX/UI sans générer de code d’implémentation.
