const express = require('express')
const router = express.Router();
const pool = require('../database')

//--Sign up
router.get('/', (req, res) => {
    res.render('pages/register');
});
router.post('/', (req, res) => {
    const { furstname, lastname } = req.body;
});

module.exports = router