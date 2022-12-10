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




# KRYSTO Backend API specifications 

 

Create the backend for a KRYSTO directory website. The frontend/UI will be created whith REACT framework. All of the functionality below needs to be fully implmented in this project. 


## Collect Points 

- List all collect points  in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Search collect point by radius from zipcode 

  * Use a geocoder to get exact location and coords from a single address field 

- Get single collect point 

- Create new collect point 

  * Authenticated users only 

  * Must have the role  "admin" 

  * Field validation via Mongoose 

- Upload a photo for collect point 

  * Admin only 

  * Photo will be uploaded to local filesystem 

- Update collect point 

  * Admin only 

  * Validation on update 

- Delete Collect point 

  * Admin only 

- Calculate the total plastic collected for a collect point 

 

## Plastic types 

- List all plastic types in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Get single Plastic types 

- Create new Plastic types 

  * Authenticated users only 

  * Must have the role  "admin" 

  * Field validation via Mongoose 

- Upload a photo for Plastic types 

  * Admin only 

  * Photo will be uploaded to local filesystem 

- Update Plastic types 

  * Admin only 

  * Validation on update 

- Delete Plastic types 

  * Admin only 

- Calculate the total plastic collected for a Plastic types 

 

## Recyclable products 

- List all Recyclable products  in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Get single Recyclable products   

- Create new Recyclable products   

  * Authenticated users only 

  * Must have the role  "admin" 

  * Field validation via Mongoose 

- Upload a photo for Recyclable products   

  * Admin only 

  * Photo will be uploaded to local filesystem 

- Update Recyclable products   

  * Admin only 

  * Validation on update 

- Delete Recyclable products   

  * Admin only 

 


## Articles 

- List all Recyclable Articles  in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Get single Recyclable Articles 

- Create new Recyclable Articles  

  * Authenticated users only 

  * Must have the role  "admin" 

  * Field validation via Mongoose 

- Upload a photo for Recyclable Articles 

  * Admin only 

  * Photo will be uploaded to local filesystem 

- Update Articles 

  * Admin only 

  * Validation on update 

- Delete Recyclable Articles   

  * Admin only 

 

## Reviews 

- List all  reviews for a article 

- List all reviews in general 

  * Pagination, filtering, etc 

- Get a single review 

- Create a review 

  * Authenticated users only 

  * Must have the role "user" or "admin"  or « collector » (no pro) 

- Update review 

  * Owner only 

- Delete review   * Owner or admin only 

 

## Requests 


- List all Recyclable Requests  in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Get single Requests 

- Create new Requests  

  * Authenticated users only 

  * Must have the role  « pro » or « collector » or « admin » 

  * Field validation via Mongoose 

- Update Requests 

  * Admin or owner only 

  * Validation on update 

- Delete Requests 

  * Admin or owner only 



## Collects 

 

- List all Recyclable Collects  in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Get single Collects 

- Create new Collects 

  * Authenticated users only 

  * Only admin or worker 

  * Field validation via Mongoose 

- Update Collects 

  * Admin only 

  * Validation on update 

- Delete Collect 

  * Admin 

 



## Partners 

 List all partners in the database 

   * Pagination 

   * Select specific fields in result 

   * Limit number of results 

   * Filter by fields 

- Search  partners by radius from zipcode 

  * Use a geocoder to get exact location and coords from a single address field 

- Get single partners 

- Create new partners 

  * Authenticated users only 

  * Must have the role "pro" or "admin" 

  * Only one partners per pro (admins can create more) 

  * Field validation via Mongoose 

- Upload a photo for partners 

  * Owner only 

  * Photo will be uploaded to local filesystem 

- Update partners 

  * Owner or admin only 

  * Validation on update 

- Delete partners 

  * Owner or admin  only 

- Calculate total plastic collected for a partners 

 

 ## Users & authentification 

- Authentication will be ton using JWT/cookies 

  * JWT and cookie should expire in 30 days 

- User registration 

  * Register as a "user" or "pro" or « collector »   

  * Once registered, a token will be sent along with a cookie (token = xxx) 

  * Passwords must be hashed 

- User login 

  * User can login with email and password 

  * Plain text password will compare with stored hashed password 

  * Once logged in, a token will be sent along with a cookie (token = xxx) 

- User logout 

  * Cookie will be sent to set token = none 

- Get user 

  * Route to get the currently logged in user (via token) 

- Password reset (lost password) 

  * User can request to reset password 

  * A hashed token will be emailed to the users registered email address 

  * A put request can be made to the generated url to reset password 

  * The token will expire after 10 minutes 

- Update user info 

  * Authenticated user only 

  * Separate route to update password 

 

 

## User CRUD 

  * Admin only 

- Users can only be made admin or worker by updating the database field manually 

 

## Security 

- Encrypt passwords and reset tokens 

- Prevent cross site scripting - XSS 

- Prevent NoSQL injections 

- Add a rate limit for requests of 100 requests per 10 minutes 

- Protect against http param polution 

- Add headers for security (helmet) 

- Use cors to make API public (for now) 

 

## Documentation 

- Use Postman to create documentation 

 

## Code Related Suggestions 

- NPM scripts for dev and production env 

- Config file for important constants 

- Use controller methods with documented descriptions/routes 

- Error handling middleware 

- Authentication middleware for protecting routes and setting user roles 

- Validation using Mongoose and no external libraries 

- Use async/await (create middleware to clean up controller methods) 

- Create a database seeder to import and destroy data 

 