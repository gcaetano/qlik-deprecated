var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


csrfProtection = csrf();
router.use(csrfProtection);

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/user/signin');
});

router.use('/signin', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl
        req.session.oldUrl = null;        
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}