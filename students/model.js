const mongoose=require('mongoose')
const schema=mongoose.Schema
const Kefir=require('kefir').Kefir
const md5=require('md5')
const validator=require('../validator/validator.js')
const random=require('random-token')
const course=require('../course/model.js')
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
    },
    token:String,
    allotedCourse:[{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }]
})

const model=mongoose.model('student',student)
const insert=function (name,regno,pass) {
return Kefir.stream(function (emitter) {
  var student=new model({
    name:name,
    password:md5(pass),
    regno:regno,
    token:random(10)
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

const addSlots=(regno,courseSlot,allotedSlot,courseId)=>{


  return Kefir.stream((emitter)=>{

       if(validator(courseSlot.split('+'),allotedSlot)){
         model.update({regno:regno},{$pushAll:{allotedSlot:courseSlot.split('+')},$push:{allotedCourse:courseId}},{upsert:true},function (err,data) {
           model.findOne({regno:regno}).populate('course').select({"password":0,"token":0}).exec(function (err,data) {
             emitter.emit(data)
           })

         })
       }else {
         emitter.error("slots are clashing pls check")
       }
  })
}

const addCourse=(courseId,regno)=>{
return course.getCourseById(courseId).flatMap((x)=>{
  if(x==null){
    return Kefir.constantError("error with course id")
  }else {

 return kuzhanthaidata(regno,x.slots,x._id)
  }
}).flatMap((x)=>{

  return addSlots(regno,x.courseSlot,x.student.allotedSlot,x.id)
})
}


const stu=(data,cb)=>{
  model.findOne(data,function (err,res) {
    cb(res)
  })
}
const kuzhanthaidata=function (regno,slot,id) {
  return Kefir.stream((emitter)=>{
    model.findOne({regno:regno},function (err,data) {
       if(err){
         emitter.error('something went wrong');
       }else {

         emitter.emit({student:data,courseSlot:slot,id:id})
       }
    })
  })
}

const getStudentDetail=function (regno) {
  return Kefir.stream((emitter)=>{
    model.findOne({regno:regno}).populate('allotedCourse').select({"password":0,"token":0})
    .exec(function (err,data) {
      if(err){
        emitter.error("something went wrong with db")
      }else {
        emitter.emit(data)
      }
    })
  })
}

const deleteCourse=function (regno,slot,courseid) {
  return Kefir.stream((emitter)=>{
    model.update({regno:regno},{$pullAll:{allotedSlot:slot.split('+')},$pull:{allotedCourse:courseid}}).exec(function (err,data) {
      model.findOne({regno:regno}).populate('allotedCourse').select({"password":0,"token":0})
      .exec(function (err,data) {
        if(err){
          emitter.error("something went wrong with db")
        }else {
          emitter.emit(data)
        }
      })
    })
  })
}
const deleteSlot=function (regno,coursecode) {
  return course.getCourseById(coursecode).flatMap((x)=>{
    if(x==null){
      return Kefir.constantError("error with course id")
    }else {

   return deleteCourse(regno,x.slots,x._id)
    }
  })
}
exports.register=register
exports.userdata=userdata
exports.student=stu
exports.addCourse=addCourse
exports.getStudentDetail=getStudentDetail
exports.deleteSlot=deleteSlot
