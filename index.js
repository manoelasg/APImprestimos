const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const usuariosController = require('./controllers/usuarios');
const consultaController = require('./controllers/consulta');
// const emprestimosController = require('./controllers/emprestimos');

//gera aplicação
const app = express();

//middlewares
app.use(bodyParser.json());
app.use('/usuarios', usuariosController);
app.use('/consulta', consultaController);

//conecta ao bd
mongoose.connect('mongodb://localhost/apimprestimos');

//servidor
app.listen(3000, () => {
    console.log('Servidor inicializado na porta 3000');
});
