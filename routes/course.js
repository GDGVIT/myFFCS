const express=require('express')
const course=require('../course/model.js')
const Kefir=require('kefir')
const Router=express.Router()
const tokenAuth=require('../middleware/token.js');
const student=require('../students/model.js')
const bodyParser=require('body-parser')
Router.get('/getbycourse',function (req,res,next) {
  var result=course.getByCourse(req.query.q)

  result.onValue((val)=>{
    res.json(val)
  })
  result.onError((val)=>{
    res.json(val)
  })
})
Router.get('/getbycoursecode',function (req,res,next) {
  var result=course.getByCourseCode(req.query.q)

  result.onValue((val)=>{
    res.json(val)
  })
  result.onError((val)=>{
    res.json(val)
  })
})

Router.get('/getbyfaculty',function (req,res,next) {
  var result=course.getByFaculty(req.query.q)

  result.onValue((val)=>{
    res.json(val)
  })
  result.onError((val)=>{
    res.json(val)
  })
})
Router.get('/get',function (req,res,next) {

  var result=course.getByWish(req.query.faculty,req.query.code)

  result.onValue((val)=>{
    res.json(val)
  })
  result.onError((val)=>{
    res.json(val)
  })
})
Router.get('/getalldata',function (req,res,next) {
var result=course.getAllData()
result.onValue((val)=>{
  res.json({status:true,data:val})
})
result.onError((val)=>{
  res.json(val)
})
})
Router.post('/addcourse',bodyParser.json(),tokenAuth,function (req,res,next) {


  var result=student.addCourse(req.body.courseid,req.body.regno)

  result.onValue((val)=>{
      res.json({status:true,data:val})
  })
  result.onError((val)=>{
    res.json({status:false,message:val})
  })

})

Router.post('/delete',bodyParser.json(),tokenAuth,function (req,res,next) {
  var result=student.deleteSlot(req.body.regno,req.body.courseid)

  result.onValue((val)=>{
      res.json({status:true,data:val})
  })
  result.onError((val)=>{
    res.json({status:false,message:val})
  })
})

module.exports=Router
