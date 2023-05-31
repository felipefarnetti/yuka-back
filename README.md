# Yuka replica Backend

## Ce repositoire contient les routes necessaires pour :

### Utilisateur:
1. Créer un utilisateur - post /signup
2. Connexion d'un utilisateur - post /login
3. Récupérer les informations de l'utilisateur - get /user
4. Suprimmer un utilisateur - delete /user/delete

### Favoris:
1. Ajouter un favorit - post /favorites/add
2. Récupérer la liste des favorits - get /favorites
3. Supprimer un favorit - delete /favorites/delete


### Ce backend est hébergé chez northflank sur l'adresse :

https://site--yuka-back--felipe--feli-qlx2.code.run

### Ces routes utilisent le middleware isAuthenticated pour les requetes dont l'anthentication est necessaire pour le frontend:

https://github.com/felipefarnetti/yuka-front

### Les données d'utilisateur sont sur MongoDB Online

## Les deux routes pour l'historique de products scannés ne sont pas fonctionnelles:
1. Ajouter à l'historique - post /products/add
2. Récupérer la liste de produits - get /products

#### L'usage du AsyncStorage a été testé pour le front - en cours

contact: felipefarnetti@gmail.com
