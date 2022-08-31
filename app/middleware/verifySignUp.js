const db = require('../models/index.models')
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        if (user) {
            return res.status(400).send({ message: "Failed, username already in use" })
        }
        User.findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err })
            }
            if (user) {
                return res.status(400).send({message: "Failed, this email already in use"})
            }
            next()
        })
    })
}

checkRoleExisted = (req, res, next) => {
    var reqRoles = req.body.roles;
    if (reqRoles)  {
        for (let i = 0; i < reqRoles.length; i++) {
            if (!ROLES.includes(reqRoles[i])) {
                return res.status(400).send({ message: `Failed role ${reqRoles[i]} doesnt exist` })
            }            
        }
    }
    next()
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
}

module.exports = verifySignUp