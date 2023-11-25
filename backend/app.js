const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());
app.use(cookieParser());

const dbURI = "mongodb+srv://mridulpandey5277:mridul77@cluster0.ygesacu.mongodb.net/cinemawave";

mongoose.connect(dbURI)
    .then(() => {
        console.log("Let's go")
        app.listen(4000);
    })
    .catch(err => {
        console.log("ERROR!!")
        console.log(err)
    })


app.use('*', checkUser);
app.use('/api',routes);