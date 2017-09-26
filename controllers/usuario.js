const express = require('express');
const UsuarioSchema = require('../schemas/usuario');

let router = express.Router();

router.get('/', (request, response) => {
    console.log('get /usuario');
});

module.exports = router;
