const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuário ja existe' });

    const user = await User.create(req.body);
    //nao retorna a senha
    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send({ error: 'Usuário nao encontrado' });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: 'Senha invalida' });

  //nao retorna a senha
  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: 'Usuário nao encontrado' });

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'stargreen@gmail.com.br',
        template: 'auth/forgot_password',
        context: { token },
      },
      (err) => {
        if (err) console.log(err);
        return res
          .status(400)
          .send({ error: 'Nao foi possível enviar, tente novamente' });

        // return res.send();
      }
    );
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send({ error: 'Error em esqueci a senha, tente novamente' });
  }
});

router.post('/reset_password', async (req, res) => {
  const { email, token, password: password } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      '+passwordResetToken passwordResetExpires'
    );
    if (!user) return res.status(400).send({ error: 'Usuário nao encontrado' });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: 'token invalido' });

    const now = new Date();
    if (now > user.passwordResetExpires)
      return res.status(400).send({ error: 'token expirado, gere um novo' });

    user.password = password;

    await user.save();

    res.send();
  } catch (err) {
    res
      .status(400)
      .send({ error: 'Nao foi possível restar a senha, tente novamente' });
  }
});

module.exports = (app) => app.use('/auth', router);
