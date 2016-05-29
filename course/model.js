const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const course=new Schema({
    name:String,
    faculty:String,
    slots:String,
    credits:Number
})
const model=mongoose.model('course',course)

