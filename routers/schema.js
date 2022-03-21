const mongoose=require('mongoose');
var Register=mongoose.Schema;
const user=new Register({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model('register',user);