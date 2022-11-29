const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);
router.get('/sign-in',usersController.sign_in);
router.get('/sign-up',usersController.sign_up);
router.get('/sign-out',usersController.destroySession);

// manual authentication methods 

router.post('/create',usersController.create);

// use passport as middleware to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
    ),usersController.createSession)


// router.post('/create-session',usersController.createSession);
// router.post('/end',usersController.endSession);

module.exports = router;