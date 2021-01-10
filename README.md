# biblio-onePage
Développement de l'interface biblio en one page from scratch
Tech:
----------
#####  vanilla javascript
#####  sass
#####  tweeter bootstrap5

----------

##### structure
- l'app dispose d'un router qui centralise les routes et cache celles-ci à l'affichage
- La structure est un peu batard entre un MVC et MVVM, ici on retrouve des tempates html pour les pages est des composant JS (template d'article) pour les elements de la base de donnée.

- les templates contient les directives suivantes
> .data-js : qui indique l'injection de donnée
> data-componant= "nom_des_données" : choisi le templete et donnée à charger
> data-count= "nombre" de article à charger


- La gestion des XML est gérer par /app/XMLExtractor.js et /app/componant/XMLBook.js
> ça extrait les données du livre dans la bdd et crée un file XML nommé par le titre_du_livre.xml

- Connexion et session : j'ai créer une session par la sauvegarder dans le navigateur en sessionStorage ou localStorage à configurer dans /conf/Config.js

> pour tester : Login => nom : admin, password : Biblio6300%

> j'ai mal gérer mon temps pour développer le back-end et formulaire



