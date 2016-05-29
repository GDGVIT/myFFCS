const mongoose=require('mongoose')
const schema=mongoose.Schema
const Kefir=require('kefir').Kefir
const md5=require('md5')
const validator=require('../validator/validator.js')
const student=new schema({
    regno:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    allotedSlot:['String'],
    totalCredits:{
        type:Number,
        default:0
    },
    name:{
      type:String,
      required:true
    }
})

const model=mongoose.model('student',student)
const insert=function (name,regno,pass) {
return Kefir.stream(function (emitter) {
  var student=new model({
    name:name,
    password:md5(pass),
    regno:regno
  })
  student.save(function (err,data) {
      if(err){
        emitter.error("something went wrong with the database,pls report this to gdgvitvellore")
      }else {
        emitter.emit("registered sucesfully login to continue")
      }
      emitter.end()
  })
})
}
const checker=function (regno) {
 return Kefir.stream(function (emitter) {
   model.findOne({regno:regno},function (err,data) {
     if(err){
        emitter.error("something went wrong with the database,pls report this to gdgvitvellore")
     }else if(data==null) {
        emitter.emit(true)
     }else {
        emitter.emit(false)
     }
      emitter.end()
   })
 })
}
const register=(name,regno,pass)=>{
 stream=checker(regno).flatMap((x)=>{
   if(x){
    return insert(name,regno,pass)
  }else {
  return Kefir.constantError("regno is already verified")
  }
 })

 return stream
}
const userdata=function (regno,cb) {
  model.findOne({regno:regno},function (err,data) {
    if(err){
      cb(err,null)
    }else {
      cb(null,data)
    }
  })
}
exports.register=register
exports.userdata=userdata
