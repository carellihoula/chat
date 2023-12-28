const express =  require('express')
const {connectDb} = require('./dbConfig/db')
//const userRoutes = require('./controllers/users/users.controller');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const PORT = 9784


connectDb()
app.use(cors({
    origin: 'http://localhost:5173', // Remplacez avec l'URL de votre client React
    credentials: true // Permet les cookies CORS
  }));
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())

//app.use('/users', require('./controllers/users/users.controller'))
app.use('/users',require('./routers/users.routers'))
app.use('/auth',require('./routers/auth.router'))

app.listen(PORT, ()=>{
    console.log('listening on port '+PORT + ' ==> http://localhost:'+PORT)
});
