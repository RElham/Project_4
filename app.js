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

//--Session setup
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
// initialize cookie-parser to allow us access the cookies stored in the browser
app.use(cookieParser());
// initialize express-session to allow tracking the logged-in user across sessions
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "mr.coffee_secret"
}));
//--Session setup

app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})

// Test
app.get('/test', (req, res) => {
    res.send("It's work")
})

// Route for mainpage
app.get('/', (req, res) => {
    res.redirect('/login')
})

// Routes
const signupRouter = require('./routes/signup')
app.use('/signup', signupRouter)
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)
const homeRouter = require('./routes/home')
app.use('/home', homeRouter)
const employeeRouter = require('./routes/employee')
app.use('/employee', employeeRouter)
const scheduleRouter = require('./routes/schedule')
app.use('/schedule', scheduleRouter)
const logoutRouter = require('./routes/logout')
app.use('/logout', logoutRouter)