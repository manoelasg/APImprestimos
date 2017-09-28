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
    console.log('post /usuarios/cadastro');

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
router.post('/login', (request, response) => {
    console.log('post /usuarios/login');
    const query = {
        email: request.body.email
    };
    UsuarioSchema.findOne(query, (error, usuario) => {
        if(usuario && passwordHash.verify(request.body.senha, usuario.senha)) {
            const token = jwt.sign({_id: usuario._id}, segredo);
            response.set('Authorization', token);
            response.set('Role', "user");
            response.status(200).send(usuario);
            return;
        }
        response.sendStatus(403);
    });
});
router.post('/fazerparte', expressJwt({secret: segredo}), (request, response) => {
    console.log('post /usuarios/fazerparte');
    const idUsuario = request.user._id;
    const solicitacao = {
        valor: request.body.valor,
        papel: request.body.papel
    };

    if(isNaN(solicitacao.valor)){
        response.sendStatus(400);
        return;
    }else if(solicitacao.valor <= 0){
        response.status(400).send("Valor digitado é inválido");
        return;
    }

    let valor = 0;
    if(solicitacao.papel === "tomador"){
        valor = -1 * solicitacao.valor;
    }else{
        valor = solicitacao.valor;
    }
    UsuarioSchema.findById(idUsuario, (error, usuario) =>{
        if(error){response.sendStatus(400);return;}
        usuario.saldo += valor;
        console.log(usuario);
        UsuarioSchema.findByIdAndUpdate(idUsuario, usuario, {new: true}, (error, resposta) => {
            if(error){response.sendStatus(401);return;}
            response.status(200).send(resposta);
            return;
        });
    });
});

module.exports = router;
