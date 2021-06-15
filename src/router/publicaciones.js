const express=require('express');
const router=express.Router();
const passport=require('passport');
const conn=require('../lib/mysql');

require('../lib/passport');

const autenticado=(req,res,next)=>{
    if (req.isAuthenticated()) next();
    else res.redirect("/login");
}

router.post('/publication',autenticado,(req,res)=>{
    if(req.body.user!=req.session.passport.user.id) res.status(401).redirect('/login');
    if(req.isAuthenticated()){
        if(req.body.title==undefined) res.status(400).redirect('/');
        if(req.body.content==undefined) res.status(400).redirect('/');
        else{
            conn.query(`INSERT INTO publication(title,content,user) values('${req.body.title}','${req.body.content}','${req.body.user}')`,(err,result)=>{
                res.status(201).redirect('/');
            })
        }
    }else res.status(401).redirect('/login');
})

module.exports=router;