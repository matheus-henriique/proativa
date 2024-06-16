const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { sendResetEmail } = require('../utils/emailService');

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado!' });
    } catch (error) {
        res.status(500).json({ error_text: 'Erro no servidor', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error_text: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error, error_text: 'Internal server error' });
    }
};


/**
 * 
 * RESET PASSWORD
 * 
 */
exports.requestResetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'Usuário não registrado!'});
    }

    console.log(user);
    const code = generateResetCode();
    user.resetCode = code;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    try {
        await sendResetEmail(email, code);
        res.json({ message: 'E-mail de recuperação enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error_text: 'Erro ao enviar e-mail', error });
    }
};

exports.resetPassword = async (req, res) => {
    const { code, password } = req.body;
    try {
        const user = await User.findOne({ 
            resetToken: code, 
            resetTokenExpiration: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error_text: 'Código inválido ou expirado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(201).json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error_text: 'Erro ao processar a solicitação' });
    }
};

const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};