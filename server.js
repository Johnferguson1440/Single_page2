//require dotenv for pass sec
require('dotenv').config();
const db = require('./db/db_configuration');
//require express
const express = require('express');
const app = express();
//require body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//require morgan
const morgan = require('morgan');
app.use(morgan("short"));
app.use(express.static('public'));





//get req for all users
app.get('/api/users', (req, res)=>{
    db.query('SELECT * FROM users', (err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.json(data.rows);
        }
    })
})
//get for single user returning shopping list user name and pass
app.post('/api/shop/:name', (req, res)=>{
    var name= req.params.name;
    var pass= req.body.pass;
    var id;
    db.query('SELECT * FROM users WHERE name= $1', [name], (err, data)=>{
        id=data.rows[0].id
        if(err){
                        console.log(err);
        }else if(data.rows[0].pass === pass){
           db.query('SELECT * FROM shop WHERE userID=$1',[id], (err, data)=>{
               if(err){
                   console.log(err);
               }else{
                   res.json(data.rows);

               }})
        }else{
            res.json("Wrong Password");
        }
    })
})

//post req for shopping list and user
app.post('/api/shop', (req, res)=>{
    var userid= 0;
    db.query('SELECT * FROM users WHERE name= $1', [req.body.name], (err, data)=>{        
        if(err){
            console.log(err);
        }else if(data.rowCount === 0){
            
            db.query('INSERT INTO users(name, pass) VALUES ($1, $2)', [req.body.name, req.body.pass], (err, data)=>{
                if(err){
                    console.log(err);
                }else{  
                    db.query('SELECT * FROM users WHERE name= $1', [req.body.name], (err, data)=>{
                        if(err){
                            console.log(err);
                        }else{
                            userid= data.rows[0].id;
                            
                            db.query('INSERT INTO shop(list, userID) VALUES ($1,$2)', [req.body.list, userid], (err, data)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    db.query('SELECT * FROM shop WHERE userID=$1',[userid], (err,data)=>{
                                        if(err){
                                            console.log(err);
                                        }else{                                       
                                            //console.log(data)
                                            res.json(data.rows);
                                        }
                                    })                                                
                                }                                    
                            })}                        
                        })                
                    }})
    }else{
        res.json(req.body.name +" user already exist");
    }
})})

//patch request for new items
//need to get id for person
//need to patch list with items deleted
// need to send back data of updated list
app.patch('/api/shop/:id', (req, res)=>{
    var id= Number.parseInt(req.params.id);
    var list = req.body.list;
    
    db.query('UPDATE shop SET list=$1 WHERE ID=$2', [list, id], (err, data) =>{
        if(err){
            console.log(err);
        }else{
            db.query('SELECT * FROM shop WHERE userID=$1', [id], (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.json(data.rows);
                }
            })
        }
    })})


//delete user and list
app.delete('/api/users/:id', (req, res)=>{
    var id= Number.parseInt(req.params.id);
    db.query('DELETE FROM users WHERE ID= $1', [id], (err, data)=>{
        if(err){
            console.log(err);
        }else{
            res.json('deleted user');
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log('server is running on 3000');
})
module.exports= app;
