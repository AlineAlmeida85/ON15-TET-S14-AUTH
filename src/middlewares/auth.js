const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

exports.checkAuth = (req, res, next) => {
    const authHeader = req.get('authorization');  
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send("Erro no header")
    }
    try{
        jwt.verify(token, SECRET, function(erro) {
          if (erro) {
            return res.status(403).send('Não autorizado');
            }
        }); 
        next();
        
    } catch(erro) {
        console.error(erro)
    }
}