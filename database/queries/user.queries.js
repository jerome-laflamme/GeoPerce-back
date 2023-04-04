const { findOneAndUpdate } = require("../models/user.model");
const User = require("../models/user.model");

//Objectif: Récupérer les données de l'utilisateur par son ID
exports.findUserByID = (id) => {
    return User.findById(id).select('-local.password');
};

exports.findUserPass = (id) => {
    return User.findById(id);
};

exports.findUserByEmail = (email) => {
    return User.findOne({ 'local.email': email });
};

exports.createUser = async (data) => {
    const user = await this.findUserByEmail(data.local.email);
    if (user) throw new Error('Courriel déjà utilisé');
    const hashedPassword = await User.hashPassword(data.local.password);
    const newUser = new User({
        name: data.name,
        local: {
            email: data.local.email,
            password: hashedPassword,
        }
    });
    return newUser.save();
};

exports.saveDefaultUser = (user) => {
    let newUser = new User({
        id: user.id,
        name:user.name,
    })
    return newUser.save()
}

exports.updateUser = (user) => {
    return User.findOneAndUpdate({_id:user._id}, user)
}

exports.getUser = (id) => {
    return User.find({id:id})
}