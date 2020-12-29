const express     = require('express')
const Router      = express.Router()
const DB          = require('../Model/db')
const bcrypt      = require('bcryptjs');

Router.post('/accountCreation',function(req,res) {
  
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  const password     = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
  const formData ={
    name         : req.body.name,
    lastname     : req.body.lastname,
    password     : password,
    email        : req.body.email,
    contact      : req.body.contact,
    dob          :"",
    location     :"",
    age          :""
  }
DB.GetOneDocument('users', {email:req.body.email}, {}, {}, function(err, result) {
  if(err) {
    res.send(response);
    } else {
      if(result){
        response.status=0
        response.message="Email already registered";
        res.send(response);
      }
      else{
        DB.InsertDocument('users', formData, function(err, result) {
          if(err) {
            res.send(response);
          } else {
                         response.status  = 1;
                         response.message = 'User registered successfully ';
                         response.result  = result;
                         res.send(response);
                       }
                    });
                  } 
              }
});
});
Router.post('/isAuth',function(req,res) {
  const email      = req.body.email;
  const password   = req.body.password;
  const user       = {
                      email    : email,
                      password : password,
                     };
  DB.GetOneDocument('users', { email:email }, {}, {}, function(err, result) {
        const response = {
          status  : 0,
          message : 'Something went wrong!'
         };
        if(err) {
            res.send(response);
          } else {
            
              if(result) {
                const passswordCheck = bcrypt.compareSync(password,result.password, null);
                  if(passswordCheck && result.email == email) {
                       res.send({status:1,message:"Logged in successfully",data:result});
                 } else {
                    res.send({status:0,message:"Invalid password"});
                 }
             } else {
               res.send({status:0,message:"Email not registered"});
             }
           
      }
  });
});
Router.post('/viewuser',function(req,res) {
    const userId = req.body.id;
    const response = {
      status  : 0,
      message : 'Something went wrong in your code!'
    }
            DB.GetOneDocument('users', {_id:userId}, {}, {}, function(err, result) {
                if(err) {
                    res.send(response);
                } else {
                     const userdata = {
                      name         : result.name,
                      lastname     : result.lastname,
                      email        : result.email,
                      contact      : result.contact,
                      dob          : result.dob,
                      location     : result.location,
                      age          : result.age
                     }
                    response.status  = 1;
                    response.message = 'success';
                    response.data    = userdata;
                    res.send(response);
                  }
               });
        });

Router.post('/edituser',function(req,res) {
  const FormData = {
     name        : req.body.name,
    lastname     : req.body.lastname,
    dob          : req.body.dob,
    location     : req.body.location,
    age          : req.body.age,
    email        : req.body.email,
    contact      : req.body.contact,
  }
  const response = {
    status  : 0,
    message : 'Something went wrong in your code!'
  }
  
            DB.FindUpdateDocument('users',{_id:req.body.id}, FormData, function(err, result) {
              if(err) {
                res.send(response);
              } else {
                  DB.GetOneDocument('users', {_id:req.body.id}, {}, {}, function(err, result) {
                  if(err) {
                    res.send(response);
                  } else {
                    const userdata = {
                     name           : result.name,
                      lastname      : result.lastname,
                      email         : result.email,
                      contact       : result.contact,
                      age           : result.age,
                      location      : result.location,
                      dob           : result.dob
                    }
                    DB.GetDocument('users', {}, {}, {}, function(err, result) {
                      if(result){
                        response.listData = result;
                      }
                    response.status  = 1;
                    response.message = 'Profile updated successfully';
                    response.data    = userdata;
                    res.send(response);
                    });
                  }
              });
            }
              });
              });
      


module.exports=Router
