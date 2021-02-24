const express = require('express')
const router = express.Router();
const pool = require('../database')

//--Login
router.get('/', (req, res) => {
    res.render('pages/login');
});
router.post('/', (req, res) => {
    const { email, password } = req.body;
});

module.exports = router