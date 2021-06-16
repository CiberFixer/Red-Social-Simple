const express=require('express');
const router=express.Router();
const passport=require('passport');
const conn=require('../lib/mysql');

require('../lib/passport');

const autenticado=(req,res,next)=>{
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
}

router.get('/',autenticado,(req,res)=>{
    let user=req.session.passport.user.id;
    res.render('index',{user:user});
});
router.get('/profile',autenticado,(req,res)=>{
    let user=req.session.passport.user.id;
    conn.query(`SELECT * FROM publication WHERE user='${user}'`,(err,publication)=>{
        res.render('perfil',{
            user:user,
            publication:publication
        });
    })
});

module.exports=router;