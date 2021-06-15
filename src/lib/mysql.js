const mysql=require('mysql');

const conn=mysql.createConnection({
    database:'RSF',
    user:'root',
    password:'',
    host:'localhost'
});


module.exports=conn;