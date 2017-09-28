const express = require('express');
const expressJwt = require('express-jwt');
const UsuarioSchema = require('../schemas/usuario');
const segredo = "mcduck";

let router = express.Router();

router.use(expressJwt({secret: segredo}));
router.get('/', (request, response) => {
    console.log('get /consulta');
    response.sendStatus(200);
});
router.get('/tomadores', (request, response) => {
    console.log('get /consulta/tomadores');
    const query = {
        saldo: {$lt: 0}
    };
    UsuarioSchema.find(query, (error, usuario) => {
        if(error) {response.status(404).send(error); return;}
        response.status(200).send(usuario);
    });
});
router.get('/credores', (request, response) => {
    console.log('get /consulta/credores');
    const query = {
        saldo: {$gt: 0}
    };
    UsuarioSchema.find(query, (error, usuario) => {
        if(error) {response.status(404).send(error); return;}
        response.status(200).send(usuario);
    });
});
router.get('/todos', (request, response) => {
    console.log('get /consulta/todos');
    UsuarioSchema.find((error, usuario) => {
        if(error) {response.status(404).send(error); return;}
        response.status(200).send(usuario);
    });
});

module.exports = router;