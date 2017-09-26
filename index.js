const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const usuarioController = require('./controllers/usuario');

const app = express();

app.use(bodyParser.json());
app.use('/usuario', usuarioController);

mongoose.connect('mongodb://localhost/apimprestimos');


app.listen(3000, () => {
    console.log('Servidor inicializado');
})
