const jwt = require('jsonwebtoken');

// ====================
// Verificar Token
// ====================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED_TOKEN, (error, decoded) => {

        if (error) {
            return res.status(401).json({
                success: false,
                message: "Token inválido",
                error
            });
        }

        req.Item = decoded.Item;

        next();

    });

}

module.exports = {
    verificaToken
}