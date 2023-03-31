const express = require('express')
const app = express()
const fs = require("fs");

const https1 = require('https')
const https2 = require('https')
const { Server } = require('socket.io')

const server1 = https1.createServer({
    key: fs.readFileSync("C:/Users/Bishop/key.pem"),
    cert: fs.readFileSync("C:/Users/Bishop/cert.pem"),
    requestCert: false,
    rejectUnauthorized: false
}, app)
// const server2 = https2.createServer({
//     key: fs.readFileSync("C:/Users/Bishop/key.pem"),
//     cert: fs.readFileSync("C:/Users/Bishop/cert.pem"),
//     requestCert: false,
//     rejectUnauthorized: false
// }, app)

const cors = require("cors")
const port1 = "3001"
const port2 = "3002"
const ip1 = "localhost"
const ip2 = "192.168.0.104"

app.use(cors())

const io1 = new Server(server1, {
    cors: {
        origin: "*"
    },
    secure: true
})
// const io2 = new Server(server2, {
//     cors: {
//         origin: "*"
//     },
//     secure: true
// })

server1.listen(port1, ip1, () => {
    console.log(`Listening to requests on ${ip1}:${port1}`);
});
// server2.listen(port2, ip2, () => {
//     console.log(`Listening to requests on ${ip2}:${port2}`);
// });

io1.on("connection", (socket) => {

    console.log("user connected via Localhost")

    socket.on("sendViaLocalhost", (data) => {
        //console.log("asd")
        console.log(data)
        socket.broadcast.emit("broadcastLocalhost", data)
    })
})

// io2.on("connection", (socket) => {

//     console.log("user connected via Android")
//     socket.on("sendViaAndroid", (data) => {
//         console.log(data)

//         socket.broadcast.emit("brodcast", data)
//     })
// })