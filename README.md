# Yuka replica Backend

## Ce repositoire contient les routes necessaires pour :

### Utilisateur:
1. Créer un compte utilisateur - post /signup
2. Connexion d'un utilisateur - post /login
3. Récupérer les informations de l'utilisateur - get /user
4. Suprimmer un compte utilisateur - delete /user/delete

### Favoris:
1. Ajouter un produit favori - post /favorites/add
2. Récupérer la liste des produits favoris - get /favorites
3. Supprimer un produit favori - delete /favorites/delete


### Ce backend est hébergé chez northflank sur l'adresse :

https://site--yuka-back--felipe--feli-qlx2.code.run

### Ces routes utilisent le middleware isAuthenticated pour les requetes dont l'authentification est necessaire pour le frontend:

https://github.com/felipefarnetti/yuka-front

### Les données sont sur la base de données MongoDB Online

## Les deux routes pour l'historique des produits scannés ne sont pas fonctionnelles:
1. Ajouter un produit à l'historique - post /products/add
2. Récupérer la liste des produits - get /products

#### L'usage du AsyncStorage est en test 

contact: felipefarnetti@gmail.com
