const express = require('express')
const connection = require('./db/connect');
const authRouter = require('./routes/AuthRoutes')
const adminRouter = require('./routes/AdminRoutes')
const gecMembersRouter = require('./routes/gecMembersRoutes')
const secretariesGecRouter = require('./routes/secretariesGecRoutes')
const GecsRouter = require('./routes/GecsRoutes')
const gecCompositionRouter = require('./routes/gecCompositionRoutes')
const StudentsRouter = require('./routes/StudentsRoutes')
const DefenseScheduleRouter = require('./routes/DefenseScheduleRoutes')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/gecMembers", gecMembersRouter)
app.use("/secretariesGec", secretariesGecRouter)
app.use("/gecs", GecsRouter)
app.use("/gecComposition", gecCompositionRouter)
app.use("/students", StudentsRouter)
app.use("/defenseSchedule", DefenseScheduleRouter)
const start = () => { 
    try {
        app.listen(PORT, console.log(`server started on port ${PORT}`)) 
    }
    catch (e) {
        console.log(e)
    }
}

start()




