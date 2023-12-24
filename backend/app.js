const express =  require('express')
const {connectDb} = require('./dbConfig/db')

const app = express()
const PORT = 3006

connectDb()

app.get('/', (req, res) => {
    res.send("salut carel")
})


app.listen(PORT, ()=>{
    console.log('listening on port '+PORT + ' ==> http://localhost:'+PORT)
});
