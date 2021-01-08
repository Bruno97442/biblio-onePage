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

* les templates contient les directives suivant
> .data-js : qui indique l'injection de donnée
> data-componant= "nom_des_données" : choisi le templete et donnée à charger
> data-count= "nombre" de article à charger



