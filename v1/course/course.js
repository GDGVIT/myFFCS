var express=require('express')
var course=express.Router()
var model=require('./model.js')
course.get('/getbycoursecode',function (req,res,next) {
  var result=model.getByCourseCode(req.query.q)
  result.onValue(function (data) {
    res.json({
      status:true,
      data:data
    })
  })

  result.onError(function (val) {
    res.json({
      status:false,
      message:val
    })
  })
})

course.get('/getslot',function (req,res,next) {
  var result=model.getSlot(req.query.q)
  result.onValue(function (data) {
    res.json({
      status:true,
      data:data
    })
  })

  result.onError(function (val) {
    res.json({
      status:false,
      message:val
    })
  })
})
course.get('/getcourse',function (req,res,next) {
  var result=model.getCourse(req.query.courseCode,req.query.slots)
  result.onValue(function (data) {
    res.json({
      status:true,
      data:data
    })
  })

  result.onError(function (val) {
    res.json({
      status:false,
      message:val
    })
  })
})
module.exports=course
