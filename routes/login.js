const express = require('express')
const router = express.Router();
const pool = require('../database')

//--Login
router.get('/', (req, res) => {
    res.render('pages/login', {
        NavEnabled: false
    });
});
router.post('/', (req, res) => {
    try {
        const { email, password } = req.body;
    
        let crypto = require('crypto');
        let pwdEncrypt = crypto.createHash('sha256').update(password).digest('base64');
        
        // Check email and password in database
        let sql = "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + pwdEncrypt + "'"
        pool.query(sql, (error, results) => {
            if (error) {
                throw error
            } else {
                if (results.rows.length > 0) {
                    // Username and password are match: Login successful
                    let user_id = results.rows[0].user_id
                    req.session.user_id = user_id;
                    res.redirect('/home')
                } else {
                    // Username or password doesn't match: Login fail
                    res.render('pages/login', {
                        NavEnabled: false
                    });
                }
            }
        })
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router