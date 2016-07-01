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
        required:true,
        unique:true
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
    allotedCourse:[{name:String,faculty:String,credits:Number,slots:String}],
    newAllotedCourse:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'courses'
}],
newAllotedSlot:['String']
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

const addSlots=(regno,courseSlot,allotedSlot,name,faculty,totalCredits,credits)=>{

  return Kefir.stream((emitter)=>{
    console.log(totalCredits);
    console.log('lelu');
       if(validator(courseSlot.split('+'),allotedSlot)){
         model.findOne({
            regno:regno,
            'allotedCourse.slots':courseSlot,
            'allotedCourse.name':name,
            'allotedCourse.faculty':faculty,
            'allotedCourse.credits':credits
          }).exec(function(err, data){
           if(data){
             console.log(data);
           }
           else{
             model.update({regno:regno},{$pushAll:{allotedSlot:courseSlot.split('+')},$push:{allotedCourse:{name:name,faculty:faculty,credits:credits,slots:courseSlot}},totalCredits:totalCredits},{upsert:true},function (err,data) {
               model.findOne({regno:regno}).populate('course').select({"password":0,"token":0}).exec(function (err,data) {
                 emitter.emit(data)
               })
             })
           }
         })
        //  model.update({regno:regno},{$pushAll:{allotedSlot:courseSlot.split('+')},$push:{allotedCourse:{name:name,faculty:faculty,credits:credits,slots:courseSlot}},totalCredits:totalCredits},{upsert:true},function (err,data) {
        //    model.findOne({regno:regno}).populate('course').select({"password":0,"token":0}).exec(function (err,data) {
        //      emitter.emit(data)
        //    })
        //  })
       }else {
         emitter.error("slots are clashing pls check")
       }
  })
}

const addCourse=(name,faculty,slot,regno,credits)=>{
return kuzhanthaidata(regno).flatMap((x)=>{
  const totalCredits = parseInt(x.student.totalCredits)
  const courseCredits = parseInt(credits)
  const calculatedCredits = totalCredits + courseCredits
  console.log(calculatedCredits);
  if(calculatedCredits<=27){
  return addSlots(regno,slot,x.student.allotedSlot,name,faculty,calculatedCredits,courseCredits)
}else {
  return Kefir.constantError("credits should not be more than 27")
}
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
         emitter.emit({student:data})
       }
    })
  })
}

const getStudentDetail=function (regno) {
  return Kefir.stream((emitter)=>{
    model.findOne({regno:regno}).populate('newAllotedCourse').select({"password":0,"token":0})
    .exec(function (err,data) {
      if(err){
        emitter.error("something went wrong with db")
      }else {
        emitter.emit(data)
      }
    })
  })
}

const deleteCourse=function (regno,slot,name,faculty,credits,totalCredits) {
  return Kefir.stream((emitter)=>{
    model.update({regno:regno},{$pullAll:{allotedSlot:slot.split('+')},$pull:{allotedCourse:{name:name,faculty:faculty,credits}},totalCredits:totalCredits}).exec(function (err,data) {
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
const deleteSlot=function (regno,slot,name,faculty,credits) {
  return kuzhanthaidata(regno).flatMap((x)=>{
    return deleteCourse(regno,slot,name,faculty,credits,x.student.totalCredits-credits)
  })
}
exports.register=register
exports.userdata=userdata
exports.student=stu
exports.addCourse=addCourse
exports.getStudentDetail=getStudentDetail
exports.deleteSlot=deleteSlot
exports.model=model
