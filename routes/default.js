const express=require('express')
const Router=express.Router()
const passport=require('passport')
const student=require('../students/model.js')
const auth=require('../middleware/auth.js')
const course=require('../course/model.js')
const tokenAuth=require('../middleware/token.js')
const bodyParser=require('body-parser')

const fs=require('fs')

const ejs=require('ejs')
const encryptor=require('simple-encryptor')('illamathianvenaharshananjananalainanayana');
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
      // console.log(x);

      student.userdata(req.session.passport.user,function (err,user) {
     res.render('timetable',{data:x,user:user,share:encryptor.encrypt(user.regno)})
      })

    })
    result.onError((x)=>{
      res.send("sorry for inconviniance we will get back to u soon")
    })
})
Router.get('/oldtimetable',auth,function (req,res,next) {
  var result=course.getAllData();

    result.onValue((x)=>{
      // console.log(x);

      student.userdata(req.session.passport.user,function (err,user) {
     res.render('oldtt',{data:x,user:user,share:encryptor.encrypt(user.regno)})
      })

    })
    result.onError((x)=>{
      res.send("sorry for inconviniance we will get back to u soon")
    })
})
Router.get('/test',auth,function (req,res,next) {
  var result=course.getAllData();

    result.onValue((x)=>{
      // console.log(x);

      student.userdata(req.session.passport.user,function (err,user) {
     res.render('timetable-2',{data:x,user:user,share:encryptor.encrypt(user.regno)})
      })

    })
    result.onError((x)=>{
      res.send("sorry for inconviniance we will get back to u soon")
    })
})
Router.get('/share',function (req,res,next) {
  var result=course.getAllData();

    console.log(encryptor.decrypt(req.query.id));
    result.onValue((x)=>{
      student.userdata(encryptor.decrypt(req.query.id),function (err,user) {

     res.render('screenshot',{data:x,user:user,share:req.query.share})
      })

    })
    result.onError((x)=>{
      res.send("sorry for inconviniance we will get back to u soon")
    })
})
Router.get('/download',function (req,res,next) {
  phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
          page.open("http://www.google.com").then(function(status) {
              page.render('google.pdf').then(function() {
                  console.log('Page Rendered');
                  res.send("poda")
                  ph.exit();
              });
          });
      });
  });
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

Router.get('/userdetail',function (req,res,next) {
  var result=student.getStudentDetail(req.query.regno);

    result.onValue((x)=>{
      res.json({status:true,data:x})

    })
    result.onError((x)=>{
      res.json({status:false,message:x})
    })
})
Router.get('/logout',auth,function (req,res,next) {
  req.logout()
  res.redirect('/')
})


module.exports=Router
