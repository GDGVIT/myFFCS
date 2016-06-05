const mongoose=require('mongoose')
const student=require('../students/model.js')
const auth=function (req,res,next) {
   student.student({token:req.headers.token},function (data) {

    if(data==null){
      res.send("invalid authentication")
    }else if(req.headers.token==data.token) {
      req.body.regno=data.regno
      console.log(req.body);
      next()
    }

   })
}
module.exports = auth;
