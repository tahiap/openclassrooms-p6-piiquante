# Informations générales

Ce dossier contient la partie backend de l'application, réalisé dans le cadre du projet 6 Piiquante, de la formation de développeur web dispensée par Openclassrooms.

Il a pour objectif le développement de la partie backend avec Node.js, la mise en place d'une API sécurisée et des opérations CRUD pour une application d'avis gastronomiques.

# Guide de déploiement

## Frontend

La partie front de ce projet a été générée avec Angular CLI version 13.2.4.  
Il se trouve à l'adresse suivante :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

Afin de récupérer et rendre le frontend opérationnel, plusieurs actions sont nécessaires.

- Cloner le repository contenant le front :  
  $ git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

- Installer les dépendances :  
  $ cd Web-Developer-P6  
  $ npm install

- Lancer ng serve :  
  $ npm run start

- Se rendre sur l'URL : http://localhost:4200/

## Backend

Pour obtenir un backend opérationnel, plusieurs actions sont nécessaires dans le dossier backend.

- S'assurer que Node.js soit installé sur la machine.

- Cloner le repository :  
  $ git clone https://github.com/tahiap/openclassrooms-piiquante.git

- Créer un dossier nommé "images". Celui-ci contiendra les images uploadées lors de la création et modification des sauces.

- Ce projet utilise le package dotenv qui permet de remplacer les chaînes de caractères sensibles. Il faut créer un dossier nommé ".env" et définir les 3 variables d'environnement :

USER="votre_nom_d'utilisateur_MongoDB"  
PASSWORD="votre_mot_de_passe_MongoDB"  
TOKEN_SECRET_KEY="votre_clé_secrète_pour_chiffrer_les_tokens"

- Installer les dépendances :  
  $ npm install

- Lancer le serveur Nodemon :  
  $ nodemon server
