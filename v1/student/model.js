var model=require('./../../students/model.js').model
var userdata=require('./../../students/model.js').userdata
var validator=require('./../../validator/validator.js')
var Kefir=require('kefir').Kefir
var courseDetail=require('./../course/model').courseDetail
var addCourse=function (regno,courseId) {
return kuzhanthaidata(regno,courseId).flatMap((x)=>{

  return courseDetail(x)
}).flatMap(function (x) {
  return Kefir.stream(function (emitter) {
  console.log(x);
   if(validator(x.course.slots.split('+'),x.user.newAllotedSlot)){
     model.update({_id:x.user._id},{$push:{newAllotedCourse:x.course._id},$pushAll:{newAllotedSlot:x.course.slots.split('+')}})
     .exec(function (err,data) {
       emitter.emit(data)
     })
   }else {
     emitter.error('course is clashing')
   }
  })
})
}

var kuzhanthaidata=function (regno,id) {
  return Kefir.stream(function (emitter) {
    userdata(regno,function (err,data) {

      emitter.emit({data:data,id:id})
    })
  })
}
var deleteCourse=function (regno,id) {
return courseDetail({id:id,data:regno}).flatMap((x)=>{
  return Kefir.stream(function (emitter) {
    model.update({regno:regno},{$pull:{newAllotedCourse:id},$pullAll:{allotedSlot:x.course.slots.split('+')}}).exec(function (err,data) {
      if(err){
        emitter.error("something went wrong contact school boy")
      }else {
        emitter.emit(data)
      }
    })
  })
})
}
exports.addCourse=addCourse
exports.deleteCourse=deleteCourse
