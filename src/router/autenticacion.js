const express=require('express');
const router=express.Router();
const passport=require('passport');
const conn=require('../lib/mysql');

require('../lib/passport');


const autenticado=(req,res,next)=>{
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
}
const desautenticado=(req,res,next)=>{
    if (req.isAuthenticated()) res.redirect("/");
    else next();
}


router.get('/login',desautenticado,(req,res)=>{
    res.render('login');
});
router.post('/login',desautenticado,passport.authenticate('local-login',({
    successRedirect:'/',
    failureRedirect:'/login'
})));
router.post('/exit',autenticado,(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
});

module.exports=router;