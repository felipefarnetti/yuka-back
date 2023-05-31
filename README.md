# yuka-back
Bonjour,

Ce repositoire contient les routes necessaires pour :

Utilisateur:
Créer un utilisateur - post /signup
Connexion d'un utilisateur - post /login
Récupérer les informations de l'utilisateur - get /user
Suprimmer un utilisateur - delete /user/delete

Favoris:
Ajouter un favorit - post /favorites/add
Récupérer la liste des favorits - get /favorites
Supprimer un favorit - delete /favorites/delete


ce backend est hébergé chez northflank sur l'adresse :

https://site--yuka-back--felipe--feli-qlx2.code.run

Ces routes utilisent le middleware isAuthenticated pour les requetes dont l'anthentication est necessaire pour le frontend:

https://github.com/felipefarnetti/yuka-front

Les données d'utilisateur sont sur MongoDB Online

Les deux routes pour l'historique de products scannés ne sont pas fonctionnelles:
Ajouter à l'historique - post /products/add
Récupérer la liste de produits - get /products

L'usage du AsyncStorage a été testé pour le front.
