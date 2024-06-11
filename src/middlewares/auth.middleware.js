const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) return res.status(401).json({ error_text: 'Acesso negado. Nenhum token fornecido.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error_text: 'Token inválido ou expirado.' });
        req.user = user;
        next();
    });
};