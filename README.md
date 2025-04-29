# Api-booking

npm init -y
npm install express
npm install express-generator -g
express api --no-view

npm install
cd api
npm install express
npm install -g nodemon
npm install --save-dev nodemon
npm install env-cmd --save-dev

changer script dans package.json pour : 
  "scripts": {
    "start": "env-cmd -f .env/.env nodemon ./bin/www",
    "dev": "env-cmd -f .env/.env.dev nodemon ./bin/www",
    "prod": "env-cmd -f .env/.env.prod nodemon ./bin/www"
  },

npm install mongoose cors --save
npm install morgan
npm install cookie-parser

npm install bcrypt --save

npm install jsonwebtoken –save

npm install autocannon -g

npm install --save-dev chai chai-http mocha
npm install @types/chai
npm install swagger-jsdoc
npm install swagger-ui-express
npm install sinon

creer un base de donnée sur mongodb 

creer un dossier .env avec à l'interieur des fichiers env nommés : ".env", ".env.dev", ".env.prod", ".env.test"

dans ces fichiers env ajouter :
NODE_ENV=template
APP_NAME=api
API_URL=<your_url>
MONGO_URI=mongodb+srv://<db_name>:<db_password>@<clusterName>.odmtx.mongodb.net/dbUser
SECRET_KEY=<your_secret_key>

Remplacer tout les dossiers et fichiers avec ceux de ce répertoire et tester l'api sur le navigateur en local.

cd api
npm run start (to open api on localhost:3000)
npm test (to test feature)
