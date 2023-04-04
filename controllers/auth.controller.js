const jtw = require("jsonwebtoken")
const { findUserByEmail } = require('../database/queries/user.queries');
const { privateKey } = require("../environment/keys")
const { httpOnly } = require("express-session/session/cookie");
const JWT_expiration = 60 * 60 * 24 * 30;
//Objectif: Vérifier si l'utilisateur existe déjà par son courriel sinon :
//          Créer un nouvel utilisateur et le retourner au front-end incluant
//          un jeton d'authentification en cookie
exports.sessionCreate = async (req, res, next) => {
    try {
        const user = await findUserByEmail(req.body.local.email);
        if (user) {
            const match = await user.comparePassword(req.body.local.password);
            if(match) {
                const token = jtw.sign({userId: user._id.toString()}, privateKey, {
                    expiresIn: JWT_expiration, // 60 * 60 * 24 * 30  pour 30 jours  <-----------------------
                    algorithm: "RS256"
                });
                res.cookie('token', token, { maxAge: JWT_expiration * 1000, httpOnly: true, /*sameSite: 'strict'*/ });
                user.local.password = undefined;
                //res.json(user, 200)
                res.status(200).send((user).toString());
            } else {
                res.json({ error: 'Bad username or password' }, 400);
            }
        } else {
            res.json({ error: 'Bad username or password' }, 400);
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};


//Objectif: Supprimer le cookie de jeton pour déconnecter l'utilisateur
exports.sessionDelete = (req, res, next) => {
    try {
        res.clearCookie("token")
        res.end()
    } catch(error) {
        res.json({ error: error.message });
    }
};
