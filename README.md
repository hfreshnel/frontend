# Application de Gestion des Dossiers Patients en Kinésithérapie

Une application web basée sur React qui permet aux kinésithérapeutes de gérer leurs patients, leurs consultations et leurs bilans articulaires, avec intégration de fonctionnalités multimédia (capture vidéo et audio).

## Table des Matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du Projet](#structure-du-projet)
- [Tests](#tests)
- [Contribution](#contribution)
- [Licence](#licence)
- [Contact](#contact)

## Description

Cette application permet aux kinésithérapeutes de :

- S'inscrire et se connecter pour accéder à leur espace personnel.
- Consulter et mettre à jour leur profil.
- Gérer la liste de leurs patients et accéder aux fiches détaillées de chaque patient.
- Créer de nouveaux dossiers patients via un formulaire multi-section, incluant la saisie vocale pour enrichir automatiquement les informations.
- Gérer les consultations et intégrer des bilans articulaires basés sur la capture vidéo via webcam.
- Télécharger et visualiser des fichiers de bilans articulaires (BDK) et obtenir des mesures d'angles (flexion et extension).

## Fonctionnalités

- **Authentification & Inscription**

  - Connexion et déconnexion sécurisées.
  - Inscription de nouveaux kinésithérapeutes avec validation des données.

- **Gestion des Patients**

  - Visualisation de la liste des patients associés.
  - Recherche et filtrage des patients.
  - Fiche client détaillée avec possibilité d'édition.

- **Consultations**

  - Création et enregistrement de consultations.
  - Intégration des bilans articulaires et affichage des mesures (angles de flexion et d'extension).

- **Nouveau Patient**

  - Formulaire multi-section pour la création d’un dossier patient.
  - Saisie dynamique avec formulaires réutilisables et sections repliables.
  - Intégration d'un module de saisie vocale via microphone pour extraire et mettre à jour automatiquement certaines informations.

- **Bilan Articulaire (BDK)**

  - Capture vidéo via webcam avec sélection du périphérique.
  - Enregistrement et upload d'extraits vidéo.
  - Traitement des vidéos pour calculer les angles articulaires.

- **Interface Utilisateur**

  - Design responsive et moderne.
  - Navigation intuitive via un header commun (logo, navigation, déconnexion).

## Technologies Utilisées

- **Frontend :**

  - React, React Router
  - Context API ou Redux
  - CSS / SASS

- **Backend & API :**

  - API RESTful en JSON
  - Gestion de l’authentification (JWT, OAuth, etc.)

- **Outils de Développement :**

  - Webpack / Vite
  - ESLint & Prettier
  - Git, Jest, React Testing Library

## Installation

1. **Cloner le dépôt :**

   ```bash
   git clone https://votre-url-de-repository.git
   cd votre-repository
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Lancer l'application en mode développement :**

   ```bash
   npm start
   ```

   L'application sera accessible via `http://localhost:3000`.

## Contact

Pour toute question, contactez l'équipe à [mahouna-wilfried.houenou@groupe-esigelec.org](mailto\:mahouna-wilfried.houenou@groupe-esigelec.org).

