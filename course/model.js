const mongoose=require('mongoose');
const Kefir=require('kefir')
const Schema=mongoose.Schema;
const course=new Schema({
    name:String,
    faculty:String,
    slots:String,
    credits:Number,
    courseCode:String
})
const model=mongoose.model('course',course);
const getByCourseCode=function (str) {
return Kefir.stream((emitter)=>{
  model.find({courseCode:new RegExp(str,'i')},(err,data)=>{
    if(err){
      emitter.error({status:false,message:'something went wrong the mongodb'});
    }else {
      emitter.emit({status:true,data:data})
    }
    emitter.end()
  })
})
}

const getByFaculty=function (str) {
return Kefir.stream((emitter)=>{
  model.find({faculty:new RegExp(str,'i')},(err,data)=>{
    if(err){
      emitter.error({status:false,message:'something went wrong the mongodb'});
    }else {
      emitter.emit({status:true,data:data})
    }
    emitter.end()
  })
})
}

const getByCourse=function (str) {
return Kefir.stream((emitter)=>{
  model.find({course:new RegExp(str,'i')},(err,data)=>{
    if(err){
      emitter.error({status:false,message:'something went wrong the mongodb'});
    }else {
      emitter.emit({status:true,data:data})
    }
    emitter.end()
  })
})
}
const getBySlots=function (str) {
return Kefir.stream((emitter)=>{
  model.find({slots:new RegExp(str,'i')},(err,data)=>{
    if(err){
      emitter.error({status:false,message:'something went wrong the mongodb'});
    }else {
      emitter.emit({status:true,data:data})
    }
    emitter.end()
  })
})
}
const getAllData=function () {
  return Kefir.stream((emitter)=>{
    model.find({}).distinct('courseCode').exec(function (err,data) {
      if(err){
        emitter.error({status:false,message:"something went wrong on mongodb"});
      }else {
        emitter.emit(data)
      }
      emitter.end()
    })

  })
}

const getByWish=function (faculty,courseCode,slot) {
  return Kefir.stream((emitter)=>{
    model.find({courseCode:new RegExp(courseCode,'i'),faculty:new RegExp(faculty,'i'),slots:new RegExp(slot,'i')},function (err,data) {
      if(err){
        emitter.error({status:false,message:"something went wrong on mongodb"});
      }else {
        emitter.emit({status:true,data:data})
      }
      emitter.end()
    })
  })
}

const getCourseById=(id)=>{

return Kefir.stream((emitter)=>{
  model.findOne({_id:id},function (err,data) {

    if(err){
      emitter.error(err);
    }else {

      emitter.emit(data);
    }
  })
})
}
exports.getByCourse=getByCourse
exports.getByFaculty=getByFaculty
exports.getByCourseCode=getByCourseCode
exports.getAllData=getAllData
exports.getByWish=getByWish
exports.getCourseById=getCourseById
exports.getBySlots=getBySlots
