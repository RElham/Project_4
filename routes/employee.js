const express = require('express')
const router = express.Router();
const pool = require('../database')

// Employee information & employee's schedule
router.get('/:id', (req, res) => {
    let id = req.params.id
    let userSql = "SELECT *, CASE WHEN a.day = 1 THEN 'Monday' WHEN a.day = 2 THEN 'Tuesday' WHEN a.day = 3 THEN 'Wednesday' WHEN a.day = 4 THEN 'Thursday' WHEN a.day = 5 THEN 'Friday' WHEN a.day = 6 THEN 'Saturday' ELSE 'Sunday' END AS day, TO_CHAR(start_at, 'HH:MM') as start_at, TO_CHAR(end_at, 'HH:MM') as end_at FROM SCHEDULES a JOIN USERS b ON a.user_id = b.user_id WHERE b.user_id = " + id 
    
    pool.query(userSql, (error, results) => {
        if (error) {
            throw error
        } else {
            //console.log(results.rows)
            res.render('pages/employee', {
                users: results.rows
            })
        }
    })
})

module.exports = router