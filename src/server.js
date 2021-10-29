const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config()



//backend CNC
const routes = require("./routes");

const app = express();
const server = require('http').createServer(app);

const connectedUsers = {};

const io = require('socket.io')(server, {
    cors: {
        origin: "https://agendamentoscnc.herokuapp.com",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
})

io.on('connection', socket =>{
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors({origin: "https://agendamentoscnc.herokuapp.com",
methods: ["GET", "POST"],
allowedHeaders: ["my-custom-header"],
credentials: true}));
app.use(express.json());


app.use(routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

server.listen(process.env.PORT || 3333);
