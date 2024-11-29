const express = require("express")
const auth = require("./routes/auth")

const app = express();

app.use(express.json())

app.use('/auth', auth);

app.get('/', (req, res)=>{
    res.send("server is running")
})

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`Server listining on : http://localhost:${PORT}`)
})