const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

const connectDataBase = require('./database/connexion');

//Connexion DB
connectDataBase();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;