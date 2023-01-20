const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//signup
router.post("/signup", async (req, res) => {
    
    try {
        // crete password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // crate new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

//signin
router.post("/signin", async (req, res) => {
    try {
        // find the user
        const user = await User.findOne({ email: req.body.email });
        // if no user is found, return a 404 status code
        if (!user) {
            return res.status(404).json({ message: "No user available" });
        }

        // check if the provided password matches the hashed password
        const samePassword = await bcrypt.compare(req.body.password, user.password);
        // if the passwords do not match, return a 401 status code
        if (!samePassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // if everything is correct, return a 200 status code and the user object
        return res.status(200).json(user);

    } catch (err) {
        // if there is an internal server error, return a 500 status code
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;