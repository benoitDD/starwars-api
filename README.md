# starwars-api [![Build Status](https://travis-ci.org/benoitDD/starwars-api.svg?branch=master)](https://travis-ci.org/benoitDD/starwars-api) [![Maintainability](https://api.codeclimate.com/v1/badges/f9ac6fbb7e9dddfb5598/maintainability)](https://codeclimate.com/github/benoitDD/starwars-api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f9ac6fbb7e9dddfb5598/test_coverage)](https://codeclimate.com/github/benoitDD/starwars-api/test_coverage)
Une api qui permet de consulter et d'enrichir des informations sur les personnages, planètes, vaisseaux et véhicules de l'univers starwars.

## Téléchargement

`git clone https://github.com/benoitDD/starwars-api.git`

## Installation

Notre api consume l'api [swapi](https://github.com/graphql/swapi-graphql). Vous devez l'installer et la lancer.



A l'intérieur du projet qu'on vient de télécharger :

`npm install`

Il faut créer un fichier **.env** avec ces informations :

```
PORT=9090

#Les applications qui sont autorisées à se connecter à cette api
CORS_ORIGIN='http://localhost:5000'

#L'api SWAPI
SWAPI_URL='http://localhost:8080'

#L'uri, login et mot de passe de la base de donnée
DB_URI=URI_DB_MONGODB
DB_LOGIN=TON_LOGIN
DB_PASSWORD=TON_MOT_DE_PASSE

#Le répertoire où l'on sauvegarde les images des utilisateurs
DIRECTORY_IMAGE=images

#Le chemin où l'utilisateur peut accéder aux images
PATH_IMAGES=/images

#Private key for the authentication
PRIVATE_KEY_TOKEN=A_KEY_FOR_TOKEN_AUTHENTIFICATION

#Le répertoire i18n
DIRECTORY_LOCALES_I18N=i18n/locales/{{lng}}/{{ns}}.json
```

Ci-dessus, il faut obligatoirement remplacer les valeurs :
* URI_DB_MONGODB: l'uri de ta base de donnée **mongodb**
* TON_LOGIN: le login de ta base de donnée
* TON_MOT_DE_PASSE: le mot de passe de ta base de donnée
* A_KEY_FOR_TOKEN_AUTHENTIFICATION: une clé/mot de passe pour le token d'authentification (ex: dPRFUqV869uSFbEj)

Après on peut créer la base de donnée **mongodb** avec :

`npm run createDB`

Ensuite on peut packager et lancer l'application avec :

`npm run build-prod`

`npm start`

Maintenant, l'api est consultable à [cette adresse](http://localhost:9090/graphql).

## Outils utilisés

* nodejs
  * express
  * jest
    * test
    * coverage
  * eslint
    * graphql
  * nodemon
  * webpack
    * babel
  * graphql
  * dotenv
  * apollo server
  * apollo datasource graphql
  * mongoose
    * mongodb
  * jsonwebtoken
  * i18next
* npm
* jenkins
* vsc debug
* vsc plugin Apollo Graphql
* travis
  * codeclimate


