const express = require('express')
const router = express.Router();
const pool = require('../database')
const validator = require('validator');
const { render } = require('ejs');

//--Sign up
router.get('/', (req, res) => {
    res.render('pages/signup', {
        NavEnabled: false,
        ErrMsgEnabled: false,
        errMsg: ""
    });
});
router.post('/', (req, res) => {
    try {
        const { firstname, lastname, email, password, confirmPassword } = req.body;
        let errMsg = ""

        // Finds the validation errors
        if (!validator.isEmail(email)) {
            errMsg = "Please enter email in correct format"
        } else if (!validator.isStrongPassword(password)) {
            errMsg = "Please enter password in correct format"
        } else if (password != confirmPassword) {
            // Password and Confirm password does not match
            errMsg = "Password doesn't match"
        }

        // Password and Confirm Password validation
        if (errMsg === "") {
            // Registered email validation
            let sql = "SELECT * FROM users WHERE email = '" + email + "'"
            pool.query(sql, (error, results) => {
                if (error) {
                    throw error
                } else {
                    if (results.rows.length > 0) {
                        // This email was registered
                        errMsg = "This email address is already being used"
                    } else {
                        // This email is not registered yet
                        let crypto = require('crypto');
                        let pwdEncrypt = crypto.createHash('sha256').update(password).digest('base64');
                        
                        pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, pwdEncrypt], (error, results) => {
                            if (error) {
                                throw error
                            } else {
                                // Sign up successful
                                res.render('pages/login', {
                                    NavEnabled: false,
                                    ErrMsgEnabled: false,
                                    errMsg: ""
                                });
                            }
                        })
                    }
                }
            })
        } else {
            //Display error message
            res.render('pages/signup', {
                NavEnabled: false,
                ErrMsgEnabled: true,
                errMsg: errMsg
            });
        }
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router