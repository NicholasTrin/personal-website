const passport = require('passport');


module.exports = app => {

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));

    app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/auth/google'}), (req,res)=>{
        console.log(req.session.passport);
        res.redirect('/');
    });

};