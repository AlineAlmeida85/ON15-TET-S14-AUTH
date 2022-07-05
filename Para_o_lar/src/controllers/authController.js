const UserSchema = require("../models/lanchesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = (req, res) => {
    try { 
         UserSchema.findOne({ email: req.body.email }, (error, user) => {
            console.log("USUÁRIO:", user)
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            }
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            console.log(validPassword)

            if(!validPassword) {
                return res.status(401).send({
                message: "Login não autorizado"
            })
          }
        })
    } catch(e) {
        console.error(e)
    }
};


module.exports = {
    login
}