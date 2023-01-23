const UserModel = require('../model/user.model');
const saveUser = async (req, res) => {
    try {
        const {username, password, email} = req.body
        const data = {
            username: username,
            password: password,
            email: email
        }
        await UserModel.create(data).then(data => {
            return res.json({
                message: 'User Register Success!'
            });
        }).catch(err => {
            if (err) {
                return res.json({
                    message: 'Already Register User! Please login'
                });
            }
        });
    } catch (err) {
    }
};
const getAllUsers = async (req, res) => {
    try {
        await UserModel.find().then(data => {
            res.send(data);
        }).catch(err => {
            if (err) {
                return res.json({
                    message: 'user not found'
                });
            }
        })
    } catch (err) {
    }
};

const getLogin = async (req, res) => {
    try {
        const email = req.params['email'];
        const password = req.params['password'];

        const data = await UserModel.findOne({"email": email})
        
        if (data !== null) {
            const passwordValue = data.password;
            if (passwordValue === password) {
                return res.status(200).json({
                    
                    message: 'User Login Success!'
                })
            } else {
                return res.json({
                    message: 'User Password Incorrect!'
                })
            }
        } else {
            return res.json({
                message: 'User not found!'
            })
        }
    } catch (err) {
    }
}

module.exports = {saveUser, getAllUsers, getLogin}