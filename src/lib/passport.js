const passport=require('passport');
const strategyLocal=require('passport-local').Strategy;
const conn=require('./mysql');

passport.use('local-login',(new strategyLocal({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},(req,username,password,done)=>{
    if(username==null) done(null,null);
    conn.query(`SELECT username,password FROM user WHERE username='${username}'`,(err,result)=>{
        if(result.length===0) return done(null,null);
        else{
            if (result[0].username==username) {
                if(result[0].password==password) return done(null,{id:username});
                else return done(null,null)
            } else return done(null,null)
        }
    })
})));

passport.serializeUser((user,done)=>{
    return done(null,{id:user.id});
})
passport.deserializeUser((id,done)=>{
    conn.query(`SELECT * FROM user WHERE username='${id}'`,(err,result)=>{
        return done(null,{id:'Jose Vargas',password:'1234'});
    })
})