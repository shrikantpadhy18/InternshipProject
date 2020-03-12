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
                
                if(user.email!='dyp@gmail.com'){
                ssn=user;
                res.render('dashboard',{user:ssn});
                }
                else if(user.email=='dyp@gmail.com')
                {
                    res.render('Adminsection',{datas:[]});
                }
            }
           
        }).catch(err=>console.log(err));
    }
})
router.get('/logout',(req,res)=>{
    res.render('homepage');
})

let datas=[]
router.post('/section',(req,res)=>{
    
let args=[]
    
    User.find().then(data=>{
        if(data){
            console.log(data);
            args=data;
        }
    })
    
    args.forEach(function(value){
        datas.push(`Name: ${value.name}\nEmail:${value.email}\nPassword:${value.password}\n ID: value.id <a>Delete</a> <a>Edit</a>\n\n\n`)
    })
    console.log(datas);
    res.render('Adminsection',{datas:args});
})
module.exports=router;