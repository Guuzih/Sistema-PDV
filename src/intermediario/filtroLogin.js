
const jwt = require('jsonwebtoken');
const pool = require('../conexao');
const hash = process.env.JWT_HASH


const filtroLogin = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({mensagem: "Não autorizado"});
    }

    const token = authorization.split(' ')[1];   
 
    try {            
        const { id } = jwt.verify(token, hash);
   

        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id] )
        

        if (rowCount< 1) {
            return res.status(401).json({mensagem: "Usuario Não Existe"});
        }
        
        const {senha, ...usuario } = rows[0]
        
        req.usuario = usuario
        
        next();

    } catch (error) {

    return res.status(401).json({mensagem: "Para acessar este recurso, um token de autenticação válido deve ser enviado."})   
    }
}


module.exports = {
    filtroLogin
}