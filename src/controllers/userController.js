const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).send("Erro no header")
  }

  jwt.verify(token, SECRET, function(err) {
    if (err) {
      return res.status(403).send('Não autorizado');
  }
});

  UserSchema.find(function (err, users) {
    if(err) {
      res.status(500).send({ message: err.message })
    }
      res.status(200).send(users)
  }) 
};

// const getAll = async (req, res) => {
//   UserSchema.find(function (err, users) {
//     if(err) {
//       res.status(500).send({ message: err.message })
//     }
//       res.status(200).send(users)
//   }) 
// };


const createUser = async (req, res) => {
  const hashDePassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashDePassword
  try{
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();
    
    res.status(201).send({
      "message": "Usuário criado com Sucesso!",
      savedUser
    })
  } catch(err) {
    console.error(err);
  };
}


module.exports = {
  getAll,
  createUser
};
