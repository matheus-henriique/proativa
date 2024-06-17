const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendResetEmail = async (email, code) => {
    const mailOptions = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Recuperação de Senha',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        background-color: #ffffff;
                        margin: 50px auto;
                        padding: 20px;
                        max-width: 600px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        font-size: 24px;
                        color: #333333;
                        text-align: center;
                    }
                    p {
                        font-size: 16px;
                        color: #666666;
                        line-height: 1.6;
                    }
                    .code {
                        font-size: 24px;
                        color: #333333;
                        text-align: center;
                        margin: 20px 0;
                        padding: 10px;
                        background-color: #f4f4f4;
                        border: 1px dashed #333333;
                        display: inline-block;
                    }
                    .footer {
                        text-align: center;
                        font-size: 12px;
                        color: #999999;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Solicitação de Redefinição de Senha</h1>
                    <p>Olá,</p>
                    <p>Você solicitou a redefinição de senha. Use o código a seguir para redefinir sua senha:</p>
                    <div class="code">${code}</div>
                    <p>Se você não solicitou isso, por favor ignore este e-mail.</p>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Proativa. Todos os direitos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    return transporter.sendMail(mailOptions);
};