const express = require("express")
const usersRouter = require("./routes/users")
const articleRouter = require("./routes/articles")
const commentRouter = require("./routes/comments")

const app = express();

app.use(express.json())

app.use('/api/users', usersRouter);
app.use('/api/articles', articleRouter);
app.use("/api/comments", commentRouter)

app.get('/', (req, res)=>{
    res.send("server is running")
})

const PORT = 4000

app.listen(PORT, ()=>{
    console.log(`Server listining on : http://localhost:${PORT}`)
})