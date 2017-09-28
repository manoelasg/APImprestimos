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
    saldo: {
        type: Number,
        default: 0
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    data_nascimento: {
        type: Date,
        required: true
    }
});

// UsuarioSchema.methods.toJSON = () => {
//     let obj = this.toObject();
//     delete obj.senha;
//     return obj;
// }

module.exports = UsuarioSchema;
