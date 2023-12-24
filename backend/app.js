import express from 'express'

const app = express()
const PORT = 3006

app.get('/', (req, res) => {
    res.send("salut carel")
})


app.listen(PORT, ()=>{
    console.log('listening on port '+PORT)
});
