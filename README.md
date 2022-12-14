
# SmartPlant

Système permettant l'arossage automatique de plantes. L'interface permet la possibilité d'y configurer l'`humidité nécéssaire`, un `interval d'arossage` ainsi qu'obtenir toutes les informations nécéssaires à propos de nos plantes.


## Liens

Le projet est actuellement en en production sur un serveur debian 11. La plante de démonstration est située dans le local B533.

- https://smartplant.mqrco.xyz (Portail)
- https://smartplant-api.mqrco.xyz/plants (API)
- mqtt://mqtt.mqrco.xyz:1883 (Serveur MQTT)

## Installation

### Mosquitto
Le système nécéssite un serveur MQTT afin d'envoyer les informations entre le boitier et l'API. Nous n'avons pas ajouté de mot de passe puisque les informations ne sont pas sensibles.

```
sudo apt install mosquitto
sudo echo "listener 1883 0.0.0.0" >> /etc/mosquitto/conf.d/default.conf
sudo echo "allow_anonymous true" >> /etc/mosquitto/conf.d/default.conf
sudo service mosquitto restart
````

### API
L'API utilise ExpressJS & NodeJS. Elle se démarre sur le port `7428`. L'URL de connexion au MQTT se trouve dans le `index.js` du projet.

```
cd api
npm install
node index.js
```

### Dashboard
Le dashboard a été créé en ReactJS. Les fichiers d'environnement permettent de définir l'IP de notre API. Le portail peut être utilisé sur navigateur comme sur mobile. Il permet de gérer les paramètres ainsi que voir les informations de toutes les plantes.

```
cd web
npm install
npm run build
```
Le contenu du build `/public` doit être mis dans un environnement apache ou nginx. 

## Impression 3D

Il est possible d'imprimer le boitier ainsi que son réservoir. Dû à sa taille, le tout est découpé en plusieurs petites sections. Les fichiers STL se retrouvent dans le dossier `impression3D`.

## Schéma Électrique

Afin de reproduire ce projet, vous devez possédez le matériel suivant :

- NodeMCU (doit être compatible Analog)
- Relai 3V
- Pompe 3V
- Écran LCD
- Capteur d'humidité
- Breadboard
- Fils électriques

![SCHEMA](https://github.com/SmartPlantCA/SmartPlant/blob/master/schema.png?raw=true)

