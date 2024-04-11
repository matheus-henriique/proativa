const User = require('../model/user.model.js');
const bcrypt = require('bcrypt');

exports.auth = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);

        if(match){
            res.status(200).json({
                Access: true
            });
        } else {
            res.status(401).json({
                Access: "Negado!!",
                Info: match
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};