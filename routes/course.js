const express=require('express')
const course=require('../course/model.js')
const Kefir=require('kefir')
const Router=express.Router()
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

module.exports=Router
