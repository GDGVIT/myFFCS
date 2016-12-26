var express=require('express')
var Router=express.Router()
var bodyParser=require('body-parser')
var auth=require('./../../middleware/token.js')
var model=require('./model.js')
Router.post('/addCourse',bodyParser.json(),auth,function (req,res,next) {
  var result=model.addCourse(req.body.regno,req.body.courseId)
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
Router.post('/deleteCourse',bodyParser.json(),auth,function (req,res,next) {
  var result=model.deleteCourse(req.body.regno,req.body.courseId)
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
module.exports=Router
