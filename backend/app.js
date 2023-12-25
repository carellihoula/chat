const express =  require('express')
const {connectDb} = require('./dbConfig/db')
//const userRoutes = require('./controllers/users/users.controller');
const bodyParser = require('body-parser')
const app = express()
const PORT = 3006


connectDb()
app.use(express.json())
app.use(bodyParser.json())

//app.use('/users', require('./controllers/users/users.controller'))
app.use('/users',require('./routers/users.routers'))

app.listen(PORT, ()=>{
    console.log('listening on port '+PORT + ' ==> http://localhost:'+PORT)
});
