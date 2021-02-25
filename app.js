//Set up
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const pool = require('./database')

const PORT = 3000
const app = express()

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'public')))
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: true
}))
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})

// Test
app.get('/test', (req, res) => {
    res.send("It's work")
})

// Routes
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
app.use('/login', loginRouter)
app.use('/signup', signupRouter)

//sql
let scheduleSql = "SELECT b.user_id, b.firstname, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at  FROM schedules a JOIN users b ON a.user_id = b.user_id ORDER BY b.username ASC"

//Create the routes
//--Get all schedules
app.get('/schedule', (req, res) => {
    pool.query(scheduleSql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.render('pages/schedule', {
                schedules: results.rows,
                ScheduleFormEnabled: false,
                username: ""
            })
        }
    })
})

app.get('/user/:id', (req, res) => {
    let id = req.params.id
    //let userSql = "SELECT b.user_id, b.firstname, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at  FROM schedules a JOIN users b ON a.user_id = b.user_id WHERE b.user_id = " & id
    let test = "SELECT *, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at FROM SCHEDULES a JOIN USERS b ON a.user_id = b.user_id WHERE b.user_id = " + id
    console.log(test)
    pool.query(test, (error, results) => {
        if (error) {
            throw error
        } else {
            //console.log(results.rows)
            res.render('pages/user', {
                users: results.rows
            })
        }
    })
})