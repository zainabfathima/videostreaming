For Server: 
Step 1: npm init create-react-app ServerApp
Step 2: cd ServerApp
Step 3: npm start
Step 4: npm install express body-parser –save-dev
Step 5: npm install node-env-run nodemon npm-run-all express-pino-logger pino-colada –save-dev
Step 6: npm install mysql ws cors multer
Step 7: Create an .env file in server react app. (Its an empty file for future database connections )
Step 8: Add “proxy”:http://localhost:3001 to package.json file
Step 9: Add “scripts”:{
                                    “server”: “node-env-run server –exec nodemon”,
                                    “dev”: “run-p server start”
                        }
              to package.json file
Step 10: Add a folder name server and add a file named index.js and paste above server/index.js code there.
Step 11: In App.js file paste server webpage code.
Step 12: Type npm run dev to start the console and server webpage.

For Client:
Step 1: npm create-react-app ClientApp
Step 2: cd ClientApp
Step 3: npm install ws axios 
Step 4: In App.js file paste client/client.js webpage code and style from client/client.css.
Step 5: Type npm start in terminal to start the client react app
Note: Run ServerApp before ClientApp so that server can run in port 3000 and client can run in port 3002.
