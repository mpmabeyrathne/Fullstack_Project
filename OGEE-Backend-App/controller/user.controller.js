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

const LoginUserNameTemp = (LOGIN_USERNAME) => {
    try {
        const fsLibrary  = require('fs')

        fsLibrary.writeFile('../OGEE-Frontend-App/temp/user-login-logs.txt', LOGIN_USERNAME, (error) => {
            if (error) throw error;
        });
    }catch (err){
        console.log(err)
    }
}

const getLogin = async (req, res) => {
    try {
        const email = req.params['email'];
        const password = req.params['password'];

        const data = await UserModel.findOne({"email": email})
        
        if (data !== null) {
            const passwordValue = data.password;
            LoginUserNameTemp(data.username);
            console.log("LOGIN USER IS : " + data.username);
            if (passwordValue === password) {
                return res.status(200).json({
                    data: data.username,
                    message: 'User Login Success!'
                });
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