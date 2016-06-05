const express=require('express')
const Router=express.Router()
const passport=require('passport')
const student=require('../students/model.js')
const auth=require('../middleware/auth.js')
const course=require('../course/model.js')
const tokenAuth=require('../middleware/token.js')
const bodyParser=require('body-parser')
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
      student.userdata(req.session.passport.user,function (err,user) {
     res.render('timetable',{data:x,user:user})
      })

    })
    result.onError((x)=>{
      res.send("sorry for inconviniance we will get back to u soon")
    })
})
Router.get('/error',function (req,res,next) {
res.render('home',{message:'invalid credentials',data:true})
})

Router.get('/detail',bodyParser.json(),tokenAuth,function (req,res,next) {
  var result=student.getStudentDetail(req.body.regno);

    result.onValue((x)=>{
      res.json({status:true,data:x})

    })
    result.onError((x)=>{
      res.json({status:false,message:x})
    })
})
module.exports=Router