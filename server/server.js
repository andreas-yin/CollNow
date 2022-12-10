const database = require('./db');
const authMiddleware = require('./passport');
const makeApp = require('./app');

const app = makeApp(database, authMiddleware);

app.listen(5000, () => {
    console.log('Server has started on port 5000');
}); 