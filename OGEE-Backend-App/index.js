const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json())

dotenv.config();
const env = process.env;

const server = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

app.use((req, res, next) => {
    console.log(req.body);
    next();
});

// IMPORT ROUTES ------------------------------------------
const UserRoute = require('./routes/user.routes')
const memoriesRoute = require('./routes/memories.routes')
const groupRoute = require('./routes/group.routes')
const notifiRoute = require('./routes/notification.route')

// USE ROUTES ---------------------------------------------
app.use('/api', UserRoute);
app.use('/api/memories', memoriesRoute);
app.use('/api/group', groupRoute);
app.use('/api/notifi',notifiRoute);


mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://admin:${env.PASSWORD}@cluster0.6geoem0.mongodb.net/${env.DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {
    server.listen(env.PORT || 8800, () => {
        console.log("DB connected !!!")
        console.log(`Server is Starting !!! | PORT ${env.PORT}`)
    })
}).catch(err => {
    if (err)
        console.log(err.message)
});

io.on('connection', socket => {
    socket.on('user_connected', async data => {
        const { email } = data;
        const user = await User.findOne({ email });
        if (!user) return;
        user.socketId = socket.id;
        await user.save();
    });
});

