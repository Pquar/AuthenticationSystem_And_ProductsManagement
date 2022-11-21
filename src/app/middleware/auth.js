const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({ error: 'Nao foi informado o token' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(401).send({ error: 'token error' });

  const [scheme, token] = parts;

  //regex
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'token malformado' });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalido' });

    req.userId = decoded.id;
    return next();
  });
};
