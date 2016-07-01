const mongoose=require('mongoose');
const Kefir=require('kefir')
var schema=mongoose.Schema;
var course=new schema({
  courseCode:String,
  courseName:String,
  slots:String,
  faculty:String
})
var model=mongoose.model('courses',course)
var getByCourseCode=function (courseCode) {
  console.log(courseCode);
return Kefir.stream(function (emitter) {
   model.find({courseCode:new RegExp(courseCode,"i")}).distinct('courseCode').exec(function (err,data) {
     if(err){
       emitter.error("something went wrong contact school boy")
     }else {
       emitter.emit(data)
     }
   })
})
}

var getSlot=function (courseCode) {
return Kefir.stream(function (emitter) {
  model.find({courseCode:courseCode}).distinct('slots').exec(function (err,data) {
      if(err){
        emitter.error("something went wrong contact school boy")
      }else {
        emitter.emit(data)
      }
    })
})
}

var getCourse=function (courseCode,slots) {
  console.log(courseCode);
  console.log(slots);
  return Kefir.stream(function (emitter) {
    model.find({courseCode:courseCode,slots:slots}).exec(function (err,data) {
      if(err){
        emitter.error("something went wrong contact school boy")
      }else {
        emitter.emit(data)
      }
    })
  })
}

var courseDetail=function (x) {
return Kefir.stream(function (emitter) {
  model.findOne({_id:x.id},function (err,data) {
    if(err){
      emitter.error("something went wrong contact school boy")
    }else {
      emitter.emit({course:data,user:x.data})
    }
  })
})
}
exports.getByCourseCode=getByCourseCode
exports.getSlot=getSlot
exports.getCourse=getCourse
exports.courseDetail=courseDetail
