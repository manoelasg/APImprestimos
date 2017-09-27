const express = require('express');
const UsuarioSchema = require('../schemas/usuario');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const expressJwt = require('express-jwt');

let router = express.Router();

router.get('/', (request, response) => {
    console.log('get /usuario');
});

router.post('/cadastro', (request, response) => {
    console.log('post  /usuario');
    response.send(request.body)
});

module.exports = router;
