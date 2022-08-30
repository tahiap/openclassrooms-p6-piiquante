## Guide de déploiement

Ce dossier contient uniquement le backend de l'application, réalisé dans le cadre du projet 6 Piiquante, de la formation de développeur web dispensé par Openclassrooms.

# Frontend
La partie front de ce projet a été généré avec Angular CLI version 13.2.4 
Il se trouve à l'adresse suivante :
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

Afin de récupérer et rendre le frontend opérationnel, plusieurs actions sont nécessaires :
- Clonez le repository contenant le front :
$ git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

- Installez les dépendances :
$ cd Web-Developer-P6
$ npm install

- Lancez ng serve :
$ npm run start

# Backend
Pour obtenir un backend opérationnel, plusieurs actions sont nécessaires dans le dossier backend :
- Créez un dossier nommé "images". Celui-ci contiendra les images uploadées lors de la création et modification des sauces.

- Ce projet utilise le package dotenv qui permet de remplacer les chaînes de caractères sensibles. Créez un dossier nommé ".env" et définissez les 3 variables d'environnement :

USER="votre_nom_d'utilisateur_MongoDB"
PASSWORD="votre_mot_de_passe_Mongo_DB"
TOKEN_SECRET_KEY="votre_clé_secrète_pour_chiffrer_les_tokens"

- Installez les dépendances :
$ npm install

- Lancez le serveur Nodemon :
$ nodemon server
