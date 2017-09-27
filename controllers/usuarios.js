const express = require('express');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const expressJwt = require('express-jwt');
const UsuarioSchema = require('../schemas/usuario');
const segredo = "mcduck";

let router = express.Router();

router.get('/', (request, response) => {
    console.log('get /usuario');
    response.sendStatus(200);
});
router.post('/cadastro', (request, response) => {
    console.log('post /usuario/cadastro');

    let usuario = new UsuarioSchema(request.body);
    usuario.senha = passwordHash.generate(request.body.senha);
    usuario.save((error, resultado) => {
        if(error) {
            response.status(400).send(error);
            return;
        }
        response.status(201).send(resultado);
    });
});
router.post('/login', (request, response) =>{
    console.log('post /usuario/login');
    const query = {
        email: request.body.email
    };
    UsuarioSchema.findOne(query, (error, usuario) => {
        if(usuario && passwordHash.verify(request.body.senha, usuario.senha)) {
            const token = jwt.sign({_id: usuario._id}, segredo);
            response.set('Authorization', token);
            response.status(200).send(usuario);
            return;
        }
        response.sendStatus(403);
    });
});

module.exports = router;
