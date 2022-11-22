# KANBAN API  - backend de l'application

Documentation en cours de rédaction

## Clonez le projet
``` 
$ git clone https://github.com/stoyann-open-classrooms/krysto_backend_api_v1.git
```

## lancer l'app 

### Installez les packages npm (décrits dans `package.json`) :

``` 
$ npm install
```


### lancer le server

``` 
$ npm run dev
```

## ENDPOINTS
l'api est disponible sur le port 5000


### `Exemples de routes`
- http://localhost:5000/api/v1/auth
- http://localhost:5000/api/v1/requests
- http://localhost:5000/api/v1/articles
- http://localhost:5000/api/v1/collects
- http://localhost:5000/api/v1/plasticTypes
- http://localhost:5000/api/v1/partners



### Importer des données dans la BD

``` 
$ node seeder -i
```
### Vider la Base de donées

``` 
$ node seeder -i
```