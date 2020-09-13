DevConnector is social media app for developers.
Technology:MERN APP (MongoDB, Express ,React, Nodejs)
prequisite:install npm,node js,mongo db

In root dir:npm install(to install all server depn.) and not forget (devDependencies)->{npm install <package-name> --save-dev} 
cd client dir:npm install(to install all client depn.)

cd config dir:create default.json for keys
{
"mongoURI":"YOUR_URL",
"jwtSecret":"YOUR jwt secret",
"githubClientID":"Your githubClientID",
"githubSecret":"Your githubSecret"

}
if you push to heroku:
   make production.json
   {
    "mongoURI":"YOUR_URL",
    "jwtSecret":"YOUR jwt secret",
    "githubClientID":"Your githubClientID",
    "githubSecret":"Your githubSecret"
   }
after install all depn. and config file
run mongodb from your computer ('mongod') or keep it working in mongpdb atlas
cd to root of project and type (npm run server) operate nodemon server
cd to client dir of project and type (npm run start)
After that go to http://localhost:3000/  
Have fun!

resourses: https://www.udemy.com/course/mern-stack-front-to-back/

