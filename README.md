# KANBAN API  - backend de l'application


Pour acceder a la documentation de l'API : [cliquer ici](https://documenter.getpostman.com/view/24434461/2s8YsnWato).



## Demarer l'application en local 


## Clonez le projet
``` 
$ git clone https://github.com/stoyann-open-classrooms/krysto_backend_api_v1.git
```


### Installez les packages npm (décrits dans `package.json`) :

``` 
$ npm install
```


### lancer le server

``` 
$ npm run dev
```

## ENDPOINTS
l'api est disponible sur le port 5056


### `Exemples de routes`
- http://localhost:5056/kryto/api/v1/auth
- http://localhost:5056/krysto/api/v1/requests
- http://localhost:5056/krysto/api/v1/articles
- http://localhost:5056/krysto/api/v1/collects
- http://localhost:5056/krysto/api/v1/plasticTypes
- http://localhost:5056/krysto/api/v1/partners



### Importer des données dans la BD

``` 
$ node seeder -i
```
### Vider la Base de donées

``` 
$ node seeder -i
```