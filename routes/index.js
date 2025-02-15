var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const bodyParser=require('body-parser');
var collection = require("./users");
// Assuming you have express-session middleware setup
const session = require('express-session');


router.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // Note: In production, set this to true and use HTTPS
}));

router.use(bodyParser.json());
//Convert data into json format.
router.use(express.json()); // It allow app to understand JSON dataset in the req. body.

// To accept HTML form data
router.use(express.urlencoded({ extended: false }));


router.get("/", (req, res) => {
  res.render('index');
})

router.get("/signup", (req, res) => {
  res.render('signup');
})

router.get('/dashboard',(req,res)=>{
  res.render('dashboard');
})

router.get('/signin',(req,res)=>{
  res.render('signin');
})


//Register user
router.post("/signup", async (req, res) => {
   const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  //check user already exists
  const existinguser = await collection.findOne({ name: data.name });
 
 
  if (existinguser) {
    res.send("User already exists. Please try another name");
  }
  else {
    // hashing password using bcrypt
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword; // Replace the original password with the hashed one

    const userdata = await collection.insertOne(data);
    console.log(userdata);
    res.render("signin");
  }
})
// Login user
router.post("/signin", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (!check) {
      res.send("User name cannot found");
    }

    // Compare the hashed password from the database with the plaintext password
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (!isPasswordMatch) {
      res.send("wrong Password");
    }
    else {
      const name = { name: req.body.name};
      res.render("dashboard",name);

      router.get('/quiz',(req,res)=>{
        res.render('quiz',name);
      })
      
      router.get('/todo',(req,res)=>{
        res.render('todo',name);
      });

    }
  }
  catch {
    res.send("wrong Details");
  }
});




module.exports = router;
