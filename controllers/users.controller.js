const { createUser, findUserByEmail, findUserByID, findUserPass, updateUser } = require('../database/queries/user.queries');
const { privateKey } = require('../environment/keys');
const jtw = require('jsonwebtoken');
const auth = require('./auth.controller')
const {validationResult} = require("express-validator");
//Objectif: Vérifier si l'utilisateur existe déjà par son courriel
exports.verifyEmail = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.params.email);
        res.send(user ? { email: user.local.email } : null);
    } catch (err) {
        next(err);
    }
};

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        } else {
            const user = await createUser(req.body);
            await auth.sessionCreate(req,res,next)
        }
    } catch (err) {
        res.json({ error: err.message });
    }
};

//Objectif: Mettre à jour les données de l'utilisateur
exports.updateUser = async (req, res, next) => {
    try {
        const temp = await findUserPass(req.body.params.user._id)
        let user = req.body.params.user
        user.local.password = temp.local.password
        user = await updateUser(req.body.params.user);
        console.log(user)
        res.json(user);
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};


//Objectif: Vérifier si l'utilisateur demandé a un jeton valide et
//          retourner les données de l'utilisateur s'il y a lieu.
exports.fetchCurrentUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (token) {
            jtw.verify(token, privateKey, async (error, decoded) => {
                if (!error) {
                    const user = await findUserByID(decoded.userId);
                    if (user) {
                        res.json(user);
                    }
                } else {
                    res.json(null);
                }
            });
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log(err);
        res.json({ error: err.message });
    }
};

