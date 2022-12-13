# CollNow
CollNow is a Q&A web app for physicians. German-speaking internal medicine resident physicians can post questions and get answers from attendings and more experienced colleagues.

## Available features
* Post a question
* Vote on the question
* Comment on the question
* Vote on the comment
* Search questions
* Register, login and logout (local strategy authentication)

## Stack
I have built the app using the PERN stack:

Frontend      | Backend
------------- | -------------
React         | Node
Redux         | Express 
Tailwind CSS  | PostgreSQL
|             | Passport.js
        
To test the app, I have created test files using:
Frontend               | Backend
---------------------- | ----------------------
React Testing Library  | Supertest
Jest                   | Jest

## Architecture
Get an overview of the [architecture of the app](/Architecture.png).

## Prerequisites
1. [Node.js](https://nodejs.org/en/) version ≥ 16.18.0 
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version ≥ 8.19.2
3. [PostgreSQL](https://www.postgresql.org/download/) version ≥ 15
4. Download a ZIP file of all the files of this app.
5. Unzip it.
6. Open the command line and go to the root directory of the app.
7. Install all dependencies for the backend:
```
cd server/
npm i
```

8. Install all dependencies for the frontend:
```
cd client/
npm i
```

9. Create a PostgreSQL database using the SQL commands specified in [database.sql](/server/database.sql).
10. Change the database configuration in [db.js](/server/db.js) to match your setup of PostgreSQL:
````
const pool = new Pool({
    user: 'postgres', 
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'collnow'
});
````

## Run the app
Open the command line and go to the root directory of the app.
1. Start the Node/Express server:
```
cd server/
node server.js
```

2. Start the React server
```
cd client/
npm start
```