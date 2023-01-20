const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/Posts")
const groupRoute = require("./routes/groups")
const groupPostRoute = require("./routes/groups")
mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

dotenv.config();

mongoose.connect(process.env.MONGO_URL , () =>
    console.log("connected to mongoDB")
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/Posts", postRoute);
app.use("/api/groups", groupRoute);
app.use("/api/groups", groupPostRoute);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

app.listen(8800,() => {
    console.log("Backend sever is ready")
})