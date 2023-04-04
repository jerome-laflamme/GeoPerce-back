const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    local: {
        email: { type: String, required: true, unique: true },
        password: { type: String },
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    },
});

//Objectif: Obtenir une fonction statique pour hacher le mot de passe
userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (e) {
        throw e;
    }
};

//Objectif: Pouvoir comparer le mot de passe haché du l'utilisateur en cours
//          avec le mot de passe non-haché fourni par le front-end
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
