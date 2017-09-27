const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const usuariosController = require('./controllers/usuarios');
const emprestimosController = require('./controllers/emprestimos');

const app = express();

app.use(bodyParser.json());
app.use('/usuarios', usuariosController);
app.use('/emprestimos', emprestimosController);

mongoose.connect('mongodb://localhost/apimprestimos');


app.listen(3000, () => {
    console.log('Servidor inicializado');
});
