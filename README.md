# Projet Angular MDBS Madagascar 2021

## Groupe:
	- RAKOTOHANITRINIAINA Maharo Rivomahefa N°25
	- RANARIVELO Voahangy Antsa N°35
  
## Liens Heroku:
  - Frontend: https://buffa-assignments.herokuapp.com/
  - Backend: https://api-assingments.herokuapp.com/
  - Username et Mot de passe **ADMIN**: admin / admin
  - Username et Mot de passe **User**: toto / toto

  
  Il est à noter que ce lien retournera une erreur si ouvert comme tel.
  Certaines fonctions sont protégées par un token, il sera donc impossible de faire des appels d'api via le navigateur.
  On pourra cependant faire des tests sur postman.
  
  **Exemple:**
  
  1. **Login**: https://api-assingments.herokuapp.com/api/auth/login
  
     **Token à récupérer(format)**:  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzFjM2FiYWQyNTM5M2UwMDc3Yzk4YiIsI.."  
  
  2. **Liste des assignments**:https://api-assingments.herokuapp.com/api/assignments/
  
      Fournir le token précédemment récupéré: Configurer le header de la requête avec un "x-access-token" en **key** et le token en **value**
      
  3. Routes  
	      - POST /api/auth/login
        - GET /api/assignments
        - PUT /api/assignments/:id
        - POST /api/assignments
        - GET /api/assignments/search/
        - DELETE /api/assignments/:id
        - GET /api/eleve
        - PUT /api/eleve/:id
        - POST /api/eleve
        - GET api/eleveList
        - GET /api/matiere
        - POST /api/matiere
        - GET /api/matiere/:id
        - GET /api/prof
        - POST /api/prof
        - GET /api/prof/:id
		
  
 ## Fonctionnalités de l'application
 
 ###### Assignments
    - Login et génération de token JWT 
    - Gestion de login/password avec JWT 
    - Ajout assignments ( Stepper )
    - Liste assignments
        - Trois onglets: Tableau paginé, Drag and drop, scroll infini
        - Avec image matière
    - Fiche assignment
        - Avec image professeur et image matière
    - Edit assignment
    - Suppression assignment
    - Drag and drop d'assignments ( Non Rendu à rendu et vice-versa )
    - Recherche
    
 ###### Elève
    - Liste élèves 
    - Ajout élève
    - Fiche élève
    - Edit élève
    
 ###### Proffesseur
    - Liste professeurs avec image 
        
 ###### Matière
    - Liste matières avec image

## Utilisation de l'application:

	**Backend:**
		- Télécharger le zip du projet git ou cloner le projet
		- Executer : **npm install**
		- Pour lancer, executer: **npm start**
    
 **Frontend:**
		- Télécharger le zip du projet git ou cloner le projet
		- Executer : **npm install**
		- Pour lancer, executer: **ng serve**

## Données
  - 500+ données
  
## Collections:
	- Assignments: _id , id, nom , note , remarque , dateRendu , prof, eleve , matiere
	- Prof: _id, id , nom , image
	- Matière: _id , id , nom , image , prof
  - Eleve: _id , nom , prenom , email
  
## Vidéo démo:
	.
		
## Sources:

	- JWT
  	- https://blog.angular-university.io/angular-jwt-authentication/
    - https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial
    - https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
	
  - CSS
    - Angular Material
    - Template https://github.com/secondtruth/startmin
    
  - Populate + paginate
    - https://www.npmjs.com/package/mongoose-paginate-v2
