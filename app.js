//Set up
const express = require('express')
const morgan = require('morgan')
const path = require('path')
//const pool = require('./database')

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

app.get('/test', (req, res) => {
    res.render('pages/schedule', {
        title: "Welcome to Mr.Coffee schedule management website",
        subTitle: "Our schedules",
        schedules: "",
        ScheduleFormEnabled: false,
        username: ""
    })
})