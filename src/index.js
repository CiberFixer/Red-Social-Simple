const express=require('express');
const path=require('path');
const passport=require('passport');
const session=require('express-session');
const cookieParser=require('cookie-parser');

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({ 
    secret: 'secret', 
    resave: true, 
    saveUninitialized: true 
}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());


app.use(require('./router/autenticacion'));
app.use(require('./router/publicaciones'));

app.listen(PORT,()=>console.log('server on port '+PORT));