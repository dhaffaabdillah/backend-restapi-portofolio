const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 8080
require('dotenv').config()

const mongostring = process.env.DATABASE_URL
const database = mongoose.connection
const db = require('./models/index.models')
const Role = db.role
var corsOptions = {
    origin : "http:localhost:8081"
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())
app.use(bodyParser.json())  // parse request content type application/json
// app.use(express.json())

// app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({message: 'Success'})
})

app.listen(PORT, () => {
    console.log(`Server runnning on http://localhost:${PORT}`);
})
// mongoose.connect(mongostring)
// database.on('error', (err) => {
//     console.log(err);
// })
// database.once('connected', () => {
//     console.log('Database connected');
// })

db.mongoose
    .connect(mongostring, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to mongo db');
        initial()
    })
    .catch(err => {
        console.error("Something went wrong: ", err);
        process.exit()
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/project.routes')(app)