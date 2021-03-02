const express = require('express')
const router = express.Router();
const pool = require('../database')

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }    
};

//--Get all schedules
router.get('/', sessionChecker, (req, res) => {
    try {
        if (req.session.user_id) {
            //--Get username
            let username = ""
            let userSql = "SELECT firstname, lastname FROM users " +
                            "WHERE user_id = " + req.session.user_id
            console.log(userSql)
            pool.query(userSql, (error, results) => {
                if (error) {
                    throw error
                } else {
                    username = results.rows[0].firstname + "  " + results.rows[0].lastname
                }
            })
            //--Get schedule
            let scheduleSql = "SELECT b.user_id, b.firstname, " + 
                                "CASE WHEN a.day = 1 THEN 'Monday' " + 
                                "WHEN a.day = 2 THEN 'Tuesday' " + 
                                "WHEN a.day = 3 THEN 'Wednesday' " +
                                "WHEN a.day = 4 THEN 'Thursday' " +
                                "WHEN a.day = 5 THEN 'Friday' " +
                                "WHEN a.day = 6 THEN 'Saturday' " + 
                                "ELSE 'Sunday' END AS day, " + 
                                "TO_CHAR(start_at, 'HH:MM') as start_at, " + 
                                "TO_CHAR(end_at, 'HH:MM') as end_at " + 
                                "FROM schedules a JOIN users b " + 
                                "ON a.user_id = b.user_id " + 
                                "WHERE a.user_id =" + req.session.user_id +
                                "ORDER BY b.firstname ASC" 
            pool.query(scheduleSql, (error, results) => {
                if (error) {
                    throw error
                } else {
                    console.log(results.rows)
                    res.render('pages/schedule', {
                        NavEnabled: true,
                        schedules: results.rows,
                        ScheduleFormEnabled: false,
                        username: username
                    })
                }
            })
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error.message)
    }
})

//--Add a new schedule
router.post('/', sessionChecker, async(req, res) => {
    try {
        //var userId = req.body.schedule.userId
        var userId = req.session.user_id
        var day = req.body.schedule.day
        var startAt = req.body.schedule.startHr +":"+ req.body.schedule.startMin +":00"
        var endAt = req.body.schedule.endHr +":"+ req.body.schedule.endMin +":00"
        
        pool.query('INSERT INTO schedules (user_id, day, start_at, end_at) VALUES ($1, $2, $3, $4)', [userId, day, startAt, endAt], (error, results) => {
            if (error) {
                throw error
            } else {
                let scheduleSql = "SELECT b.user_id, b.firstname, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at  FROM schedules a JOIN users b ON a.user_id = b.user_id ORDER BY b.firstname ASC" 

                pool.query(scheduleSql, (error, results) => {
                    if (error) {
                        throw error
                    } else {
                        res.render('pages/home', {
                            NavEnabled: true,
                            schedules: results.rows
                        })
                    }
                })
            }
        })
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router