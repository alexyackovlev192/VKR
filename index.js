const express = require('express')
const connection = require('./db/connect');
const authRouter = require('./routes/AuthRoutes')
const adminRouter = require('./routes/AdminRoutes')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use("/auth", authRouter)
app.use("/admin", adminRouter)

const start = () => { 
    try {
        app.listen(PORT, console.log(`server started on port ${PORT}`)) 
    }
    catch (e) {
        console.log(e)
    }
}

start()




