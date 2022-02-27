# CONTRIBUTING

## Environement de travail

- OS : Debian GNU/Linux 11
- node v16.9.0
- npm v7.21.1

## Structure du projet

- `axios-instances.js` : un fichier avec des [instances axios](https://axios-http.com/docs/instance) permettant de factoriser du code pour interagir avec les APIs (baseURL, headers, etc.)
- `deploy-commands.js` : fichier à exécuter pour déployer des commandes slash vers un serveur (dont le `guildId` doit être renseigné dans `config.json`.
- `index.js` : fichier a exécuter pour que le bot soit actif (connecté sur discord)
