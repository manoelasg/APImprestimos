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

    let dataAtual = new Date();
    let dtNascimento = new Date(usuario.data_nascimento);
    let idade = dataAtual.getFullYear() - dtNascimento.getFullYear();
    let mes = dataAtual.getMonth() - dtNascimento.getMonth();

    if(idade < 18 || (idade <18 && mes < 0) || (idade <18 && mes === 0 && dataAtual.getDate() < dtNascimento.getDate())){
        response.status(403).send("Usuário menor de idade");
        return;
    }

    usuario.senha = passwordHash.generate(request.body.senha);
    usuario.save((error, resultado) => {
        if(error) {
            response.status(500).send(error);
            return;
        }
        let usuarioResposta = {
            nome: resultado.nome,
            email: resultado.email,
            saldo: resultado.saldo
        };
        response.status(201).send(usuarioResposta);
    });
});
router.post('/login', (request, response) => {
    console.log('post /usuarios/login');
    const query = {
        email: request.body.email
    };
    UsuarioSchema.findOne(query, (error, usuario) => {
        if(error){response.sendStatus(500); return;}
        if(usuario && passwordHash.verify(request.body.senha, usuario.senha)) {
            const token = jwt.sign({_id: usuario._id}, segredo);
            response.set('Authorization', token);
            // response.set('Role', "user");
            
            let usuarioResposta = {
                nome: usuario.nome,
                email: usuario.email,
                saldo: usuario.saldo
            };
            
            response.status(200).send(usuarioResposta);
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

    //Consistência do valor digitado
    if(isNaN(solicitacao.valor) || solicitacao.valor <= 0){
        response.status(400).send("Valor digitado é inválido");
        return;
    }

    //Consistência do papel digitado
    let valor = 0;
    if(solicitacao.papel.toLowerCase() !== "tomador" && solicitacao.papel.toLowerCase() !== "credor"){
        response.status(403).send("Papel digitado é inválido");
        return;        
    }else if(solicitacao.papel.toLowerCase() === "tomador")
        valor = -1 * solicitacao.valor;
    else
        valor = solicitacao.valor;

    UsuarioSchema.findById(idUsuario, (error, usuario) =>{
        if(error){response.sendStatus(500);return;}
        usuario.saldo += valor;
        UsuarioSchema.findByIdAndUpdate(idUsuario, usuario, {new: true}, (error, resposta) => {
            if(error){response.sendStatus(500);return;}
            
            let usuarioResposta = {
                nome: resposta.nome,
                email: resposta.email,
                saldo: resposta.saldo
            };            

            response.status(200).send(usuarioResposta);
            return;
        });
    });
});

module.exports = router;
