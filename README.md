# starwars-api
Une api qui permet de consulter et d'enrichir des informations sur les personnages, planètes, vaisseaux et véhicules de l'univers starwars.

## Téléchargement

`git clone https://github.com/benoitDD/starwars-api.git`

## Installation

A l'intérieur du projet qu'on vient de télécharger :

`npm install`

Il faut créer un fichier **.env** avec ces informations :

`
PORT=9090
`

Le numéro du port est libre de choix.

Ensuite on peut packager et lancer l'application avec :

`npm run build-prod`

`npm start`

Maintenant, l'api est consultable à [cette adresse](http://localhost:9090).

## Outils utilisés

* nodejs
  * express
  * nodemon
  * webpack
    * babel
  * dotenv
* npm
* vsc debug


