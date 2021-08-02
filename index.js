// npm init
// npm intall ecpress body-parser(it help to parse the data in the json format as mongodb stores in json ) mongoose nodemon(save our time it automatically start server)         // these are the dependencies

// npm install express body-parser mongoose nodemon     // we can install together also not teh method 
// to run the file is (nodemon index.js)


var express  = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))   // this line is necessary note it is the folder name 
app.use(bodyParser.urlencoded({
    extended:true
}))

// till now this are the basic step ,
// now we going to connect the database through the mongoose

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// here we use my database(my db) you can use any databse by (use x) as we read earlier how to create the data and how to show database(show dbs)

// now initialize the connection
var db = mongoose.connection;

// check for the connection
db.on('error', ()=>{    console.log("Error in connecting in database")})
db.once('open',()=>{console.log("connected to database")})


app.post("/sign_up",(req, res)=>{
    // this(/sign_up ) you should write in a form 
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var passward = req.body.passward;

    // all these data are going to store in a single subject
    var data = {"name":name, "email":email ,"phno":phno, "passward":passward}

    db.collection('users').insertOne(data, (err,collection)=>{
        if(err){
            throw err;
        }
        // we know after writing the if than it automatically goes to the else statment 
        console.log("RECORD ADD SUCCESSFULLY");
        // than now 
        return res.redirect('signup_success.html');
    })
})

app.get("/", (req , res)=>{
    res.set({
        "ALLow-access-ALLow-Origin": '*'
    })
    return res.redirect('contact.html');
}).listen(3000);

console.log("listening on the port 3000");