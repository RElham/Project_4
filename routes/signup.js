const express = require('express')
const router = express.Router();
const pool = require('../database')

//--Sign up
router.get('/', (req, res) => {
    res.render('pages/signup', {
        message: ""
    })
});
router.post('/', (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        // Password and Confirm Password validation
        if (password === confirmPassword) {
            // Registered email validation
            let sql = "SELECT * FROM users WHERE email = '" + email + "'"
            pool.query(sql, (error, results) => {
                if (error) {
                    throw error
                } else {
                    if (results.rows.length > 0) {
                        // This email was registered
                        res.render('pages/signup', {
                            message: "This email address is already being used"
                        })
                    } else {
                        // This email is not registered yet
                        let crypto = require('crypto');
                        let pwdEncrypt = crypto.createHash('sha256').update(password).digest('base64');
                        
                        pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, pwdEncrypt], (error, results) => {
                            if (error) {
                                throw error
                            } else {
                                // Sign up successful
                                let scheduleSql = "SELECT b.user_id, b.firstname, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at  FROM schedules a JOIN users b ON a.user_id = b.user_id ORDER BY b.firstname ASC" 

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
                            }
                        })
                    }
                }
            })
        } else {
            // Password and Confirm password does not match
            res.render('pages/signup', {
                message: "Password doesn't match"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router