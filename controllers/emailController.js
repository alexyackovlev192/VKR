const sendMail = require('../mailer');
const {validationResult} = require('express-validator')


class emailController {
    async send(req, res) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"Ошибка при отправке письма", errors})
            }

            const {to, subject, text} = req.body;

            await sendMail(to, subject, text);
            res.status(200).json({ message: 'Письмо успешно отправлено' });
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
            res.status(500).json({ message: 'Ошибка при отправке письма', error });
        }
    }
}
module.exports = new emailController()