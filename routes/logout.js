const express = require('express')
const router = express.Router();
const pool = require('../database')
const session = require('express-session')
router.use(session({secret: "It's a secret!"}));

// Logout
router.get('/', function(req, res){
   res.clearCookie('user_sid')
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
 });

module.exports = router