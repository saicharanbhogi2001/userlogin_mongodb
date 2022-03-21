const express=require('express');
const app=express();
const Register=require('./routers/schema');
app.use(express.static("contents"));
const session=require('express-session');
app.use(session({secret:'charan'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session());



//connecting to monogoose
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://saicharanbhogi:rssscharan.1352@cluster0.fcbfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>{
    console.log("Connected to mongodb")
});
const connection=mongoose.connection;


app.get("/",(req,res)=>{
    if (req.session.visited==true)
    {
        res.sendFile(__dirname+'/contents/home.html');
    }
    else{
        res.sendFile(__dirname+'/contents/main.html');
    }
});
app.get("/home",(req,res)=>{
    if (req.session.visited==true)
    {
    res.sendFile(__dirname+'/contents/home.html');
    }
    else{
        res.sendFile(__dirname+'/contents/main.html');
    }
});




//user registration
app.get("/register",(req,res)=>{
    res.sendFile(__dirname+'/contents/registration.html');
});
app.post('/register',(req,res)=>{
    Register.create({
        username:req.body.username,
        password:req.body.password,
        fullname:req.body.fullname,
        email:req.body.useremail,
        number:req.body.number,
    },function(err){
        if(err)
        console.log('Something Went wrong'+err);
        else
        console.log('User registered');
        res.redirect('/')
    });
});


//user login
app.post('/login',function(req,res){
    req.session.visited=false;
    a=req.body.username;
    b=req.body.password;
    console.log(a + "   "+ b)
    Register.findOne({username:a,password:b},function(err,result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(result == null)
            {
                res.redirect("/")
            }
            else{
                req.session.visited=true;
                console.log(result);
                res.redirect('/home');
            }
        }
        
    })
});



//user logout
app.get("/logout",(req,res)=>{
    req.session.visited=false;
    res.sendFile(__dirname+'/contents/main.html');
});

//userupdate
app.get('/update',function(req,res){
    if(req.session.visited==true){
        res.sendFile(__dirname+'/contents/update.html');
    }
    else{
        res.sendFile(__dirname+'/contents/main.html');
    }
})
app.post('/update',function(req,res){
    const c=req.body.correctusername;
    const d=req.body.correctpassword;
    Register.update({username:c,password:d},function(err,result){
        if(err){
            console.log(err)  
        }
        else{
            if(result==null)
            {
                res.redirect('/update');
            }
            else{
                console.log(result);
                req.session.visited=false;
                res.redirect('/');
            } 
            
        }
    });
});

app.listen(5000,()=>console.log("Started!!!"))