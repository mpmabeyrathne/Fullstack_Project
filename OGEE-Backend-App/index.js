const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();
const env = process.env;

app.use((req, res, next) => {
    console.log(req.body);
    next();
});

// IMPORT ROUTES ------------------------------------------
const UserRoute = require('./routes/user.routes')
const memoriesRoute = require('./routes/memories.routes')
const groupRoute = require('./routes/group.routes')

// USE ROUTES ---------------------------------------------
app.use('/api', UserRoute);
app.use('/api/memories', memoriesRoute);
app.use('/api/group', groupRoute);


mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://admin:${env.PASSWORD}@cluster0.6geoem0.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
    app.listen(env.PORT || 8800, () => {
        console.log("DB connected !!!")
        console.log(`Server is Starting !!! | PORT ${env.PORT}`)
    })
}).catch(err => {
    if (err)
        console.log(err.message)
});