const cors = require('cors');
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
const DefenseScheduleStudentRouter = require('./routes/DefenseScheduleStudentRoutes')
const DirectionsRouter = require('./routes/directionsRoutes')
const RolesRouter = require('./routes/rolesRoutes')
const CriteriaRouter = require('./routes/criteriaRoutes')
const ResultComissionMemberRouter = require('./routes/resultComissionMemberRoutes')
const ResultComissionSecretaryRouter = require('./routes/resultComissionSecretaryRoutes')
const UserRouter = require('./routes/UserRoutes')
const PORT = process.env.PORT || 5000

const app = express()
app.use(cors());
app.use(express.json())
app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/gecMembers", gecMembersRouter)
app.use("/secretariesGec", secretariesGecRouter)
app.use("/gecs", GecsRouter)
app.use("/gecComposition", gecCompositionRouter)
app.use("/students", StudentsRouter)
app.use("/defenseSchedule", DefenseScheduleRouter)
app.use("/defenseScheduleStudents", DefenseScheduleStudentRouter)
app.use("/directions", DirectionsRouter)
app.use("/roles", RolesRouter)
app.use("/criteria", CriteriaRouter)
app.use("/resultComissionMember", ResultComissionMemberRouter)
app.use("/resultComissionSecretary", ResultComissionSecretaryRouter)
app.use("/users", UserRouter)

const start = () => { 
    try {
        app.listen(PORT, console.log(`server started on port ${PORT}`)) 
    }
    catch (e) {
        console.log(e)
    }
}

start()




