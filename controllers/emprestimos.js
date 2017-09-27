const express = require('express');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const expressJwt = require('express-jwt');
const EmprestimoSchema = require('../schemas/emprestimo');
const segredo = "mcduck";

let router = express.Router();

router.get('/', (request, response) => {
    console.log('get /emprestimos');
    response.sendStatus(200);
});


module.exports = router;
