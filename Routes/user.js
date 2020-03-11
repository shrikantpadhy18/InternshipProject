const express=require('express');
const router=express.Router();
const User=require('../Models/User');
var ssn;
router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/register',(req,res)=>{
    const{name,email,password,password2}=req.body;
    if(password==password2){
        User.findOne({email:email}).then(user=>{
            if(user){
            res.render('register')
            }
            else{
                const newuser=new User({
                    name,
                    email,
                    password
                })
                newuser.save().then(()=>res.render('login')).catch(err=>console.log(err));
               
            }
        }).catch(err=>{
            console.log(err);
        })
        res.render('login');


    }
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.render('login');

    }
    else{
        
        User.findOne({email:email,password:password}).then(user=>{
            if(user){
                
                ssn=user;
                res.render('dashboard',{user:ssn});
            }
           
        }).catch(err=>console.log(err));
    }
})
router.get('/logout',(req,res)=>{
    res.render('homepage');
})
module.exports=router;