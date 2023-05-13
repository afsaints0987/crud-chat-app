const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const {Server} = require('socket.io')
const {createServer} = require('http')
const userRoute = require('./routes/UserRoute')

const port = process.env.PORT || 5000

const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', userRoute)

// Server Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
})
// Connect to Socket IO
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log('User Disconnected', socket.id)
    })
})


// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log(`DB Connected to host: ${process.env.MONGODB_URI}`))
.catch(err => console.log('DB Connection Faild', err.message))

httpServer.listen(port, () => {
    console.log(`HTTP Server is listening in ${port}`)
})

