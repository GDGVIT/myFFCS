const express=require('express');
const app=express();
const passport=require('passport')
const passportlocal=require('passport-local')
const session=require('cookie-session')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const student=require('./students/model.js')
const md5=require('md5')
mongoose.connect("mongodb://balaji:mathi@ds019053.mlab.com:19053/myffcs")
app.use(session({name:'session',keys:['mathi','bujima']}))
  app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine','ejs')
app.use(express.static(__dirname + '/public'));
function findUser (username, callback) {

  student.userdata(username,function (err,data) {

    if(err)
    {
    return callback(err,null)
  }else if(data==null) {
    return callback(null,'not registered')
  }else {
        return callback(null,data)
  }
  })
}
passport.serializeUser(function (user, cb) {
  cb(null, user.regno)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})
passport.use(new passportlocal.Strategy(function (username,password,done) {

  findUser(username,function (err,data) {

    if(err){
      return done(err,null)
    }else if(data==null) {
       return done(null,false)
    }else if(data.password==md5(password)) {
      console.log("going");
      return done(null,data)
    }
    return done(null,false)
  })
}))



app.use('/',require('./routes/default.js'))
app.use('/course',require('./routes/course.js'))
app.use('/v1/course',require('./v1/course/course.js'))
app.use('/v1/student',require('./v1/student/student.js'))
app.listen(8080);
