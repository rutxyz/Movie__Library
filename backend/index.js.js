const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
app.use(express.json());
app.use(cors());
const port = 4000;
const jwt = require("jsonwebtoken");
const path = require("path");
const movieListRoutes = require('./routes/movieLists');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
  };

// Schema for creating user model
const Users = mongoose.model("Users", {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });


  
//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
    console.log("Login");
      let success = false;
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
          const passCompare = req.body.password === user.password;
          if (passCompare) {
              const data = {
                  user: {
                      id: user.id
                  }
              }
              success = true;
        console.log(user.id);
              const token = jwt.sign(data, 'secret_ecom');
              res.json({ success, token });
          }
          else {
              return res.status(400).json({success: success, errors: "please try with correct email/password"})
          }
      }
      else {
          return res.status(400).json({success: success, errors: "please try with correct email/password"})
      }
  })
  
 
  
app.post('/signup', async (req, res) => {
    console.log("Sign Up");
    let success = false;
    try {
      let check = await Users.findOne({ email: req.body.email });
      if (check) {
        return res.status(400).json({ success: success, errors: "Existing user found with this email" });
      }
      const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      await user.save();
      const data = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(data, 'secret_ecom');
      success = true;
      res.json({ success, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: success, errors: 'Internal server error' });
    }
  });

// Routes
app.use('/auth', authRoutes);
app.use('/lists', fetchuser, movieListRoutes); 


  app.get("/", (req, res) => {
    res.send("Server Running ");
  });

app.listen(port, (error) => {
    if (!error) console.log("Server Running on port " + port);
    else console.log("Error : ", error);
  });





  
