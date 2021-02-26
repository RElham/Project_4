const express = require('express')
const router = express.Router();
const pool = require('../database')

//--Get all schedules
router.get('/', (req, res) => {
    let scheduleSql = "SELECT b.user_id, b.firstname, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at  FROM schedules a JOIN users b ON a.user_id = b.user_id ORDER BY b.firstname ASC" 

    pool.query(scheduleSql, (error, results) => {
        if (error) {
            throw error
        } else {
            res.render('pages/home', {
                schedules: results.rows,
                ScheduleFormEnabled: false,
                username: ""
            })
        }
    })
})

module.exports = router