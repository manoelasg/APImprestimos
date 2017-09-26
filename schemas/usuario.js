const mongoose = require('mongoose');

const UsuarioSchema = mongoose.model('Usuario', {
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    renda: {
        type: Number,
        required: false
    },
    senha: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    }
});

module.exports = UsuarioSchema;
