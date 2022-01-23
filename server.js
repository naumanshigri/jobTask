const express = require("express");
const helmet = require('helmet');
const log = require('./utils/logs')
const app = express();

const {  HOST, PORT } = require("./config/config");
console.log = function() {} // remove logs from all over projects

let { dbConnection } = require('./utils/connection')

// DB connection 
dbConnection()
.then(()=> log('Connected to Database', 'green'))
.catch(err => {
    console.log('error in connection', err)
    log(`Data Base Connection Failed, ${err.message}`,'red' )
})

// Express Bodyparser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(helmet())

app.get("/", (req, res)=>{
    console.log('Port ', PORT)
    res.send('Api Running')
  })


// API / Routes;
require('./routes')(app);

let server = require('http').createServer(app);

server.listen(PORT, () => console.log(`Server started on http://${HOST}:${PORT}`));
