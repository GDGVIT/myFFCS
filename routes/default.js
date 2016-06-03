const express=require('express')
const Router=express.Router()
const passport=require('passport')
const student=require('../students/model.js')
const auth=require('../middleware/auth.js')
const course=require('../course/model.js')
Router.get('/',function (req,res,next) {
  res.render('home',{data:false})
})
Router.post('/login',passport.authenticate('local',{
  failureRedirect:'/error',
  successRedirect:'/home',
  session:true
}))
Router.post('/register',function (req,res,next) {

  var result=student.register(req.body.name,req.body.regno,req.body.password)

  result.onValue((x)=>{
    console.log(x);
    res.render('home',{message:x,data:true})
  })
  result.onError((x)=>{
    console.log(x);
      res.render('home',{message:x,data:true})
  })
})
Router.get('/home',auth,function (req,res,next) {
  var result=course.getAllData();
    result.onValue((x)=>{
      res.render('timetable',{data:x})
    })
    result.onError((x)=>{
      res.send("sorry for inconviniance we will get back to u soon")
    })
})
Router.get('/error',function (req,res,next) {
res.render('home',{message:'invalid credentials',data:true})
})
module.exports=Router
