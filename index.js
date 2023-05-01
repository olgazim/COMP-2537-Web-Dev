const express = require('express');
const session = require('express-session');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.connect

const app = express();
const port = process.env.PORT || 3000;
const node_session_secret = '95951b38-e2b2-458f-9c7c-f0b06ecc58b1';


app.use(express.static("public"));

app.use(express.urlencoded({ extended: false })); // built-in middleware func

app.use(session({
    secret: node_session_secret,
    saveUninitialized: false,
    resave: true
}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/signupFailure', (req, res) => {
    var missingParam = req.query.missing;
    console.log(missingParam);
    var errorMsg = "Please, try again"
    if (missingParam == 1) {
        errorMsg =  "All fields are missing. Please, try again"; 
    } else if (missingParam == 2) {
        errorMsg =  "Username and email are missing. Please, try again";
    } else if (missingParam == 3) {
        errorMsg =  "Username and password are missing. Please, try again";
    } else if (missingParam == 4) {
        console.log("4")
        errorMsg = "Email and password are missing. Please, try again";
    } else if (missingParam == 5) {
        errorMsg =  "Username is missing. Please, try again";
    } else if (missingParam == 6) {
        errorMsg =  "Email is missing. Please, try again";
    } else if (missingParam == 7) {
        errorMsg =  "Password is missing. Please, try again";
    } 
    fs.readFile(__dirname + "/pages/error-page.html", "utf8", (err, data) => {
            // Replace the placeholder with the error message
            var modifiedData = data.replace("{errorMsg}", errorMsg);

            // Send the modified content to the client
            res.send(modifiedData);
    });
});

app.get("/signup", (req, res) => { 
    res.sendFile(__dirname + "/pages/signup.html");
});

app.post('/signup', (req, res) => { 

    var username = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;

    if (!username && !email && !password) {
        console.log("All fields are missing. Please, try again");
        res.redirect('/signupFailure?missing=1');
        return;
    } else if (!username && !email) {
        console.log("Username and email are missing. Please, try again");
        res.redirect('/signupFailure?missing=2');
        return;
    } else if (!username && !password) {
        console.log("Username and password are missing. Please, try again");
        res.redirect('/signupFailure?missing=3');
        return;
    } else if (!email && !password) {
        console.log("Email and password are missing. Please, try again");
        res.redirect('/signupFailure?missing=4');
        return;
    } else if (!username) {
        console.log("Name is missing. Please, try again");
        res.redirect('/signupFailure?missing=5');
        return;
    } else if (!email) {
        console.log("Email is missing. Please, try again");
        res.redirect('/signupFailure?missing=6');
        return;
    } else if (!password) {
        console.log("Password is missing. Please, try again");
        res.redirect('/signupFailure?missing=7');
        return;
    } 

    res.redirect('/members');
});



app.post('/creatweUser22', (res, req) => {
    // var username = req.body.user_name;
    // var email = req.body.email;
    // var password = req.body.password;
    console.log('inside createUser');
    res.redirect("/members");

    // if (!username) {
    //     console.log(username);
    //     console.log("Name is missing. Please, try again");
    //     res.redirect('/signupFailure?missing=1');
    // } else if (!email) {
    //     console.log("Email is missing. Please, try again");
    //     res.redirect('/signupFailure?missing=2');
    // } else if (!password) {
    //     console.log("Password is missing. Please, try again");
    //     res.redirect('/signupFailure?missing=3');
    // } else if (!username && !email && !password) {
    //     console.log(user);
    //     console.log(email);
    //     comsole.log(password);
    //     console.log("All fields are missing. Please, try again");
    //     res.redirect('/signupFailure?missing=4');
    // } else if (!username && !email) {
    //     console.log("Username and email are missing. Please, try again");
    //     res.redirect('/signupFailure?missing=5');
    // } else if (!username && !password) {
    //     console.log("Username and password are missing. Please, try again");
    //     res.redirect('/signupFailure?missing=6');
    // } else if (!email && !password) {
    //     console.log("Email and password are missing. Please, try again");
    //     res.redirect('/signupFailure?missing=7');
    // } 

    // users.push({username: username, password: hashedPassword});
}
);

app.get("/login", (req, res) => { 
    res.sendFile(__dirname + "/pages/login.html");
});

// const Joi = require('joi');
// app.use(express.json()) // built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// app.post('/login', async (req, res) => {
//   // set a global variable to true if the user is authenticated

//   // sanitize the input using Joi
//   const schema = Joi.object({
//     password: Joi.string()
//   })

//   try {
//     console.log("req.body.password " + req.body.password);
//     const value = await schema.validateAsync({ password: req.body.password });
//   }
//   catch (err) {
//     console.log(err);
//     console.log("The password has to be a string");
//     return
//   }

//   try {
//     const result = await usersModel.findOne({
//       username: req.body.username
//     })
//     if (bcrypt.compareSync(req.body.password, result?.password)) {
//       req.session.GLOBAL_AUTHENTICATED = true;
//       req.session.loggedUsername = req.body.username;
//       req.session.loggedPassword = req.body.password;
//       res.redirect('/');
//     } else {
//       res.send('wrong password')
//     }

//   } catch (error) {
//     console.log(error);
//   }

// });

app.get("/members", (req, res) => { 
    console.log("inside members");
    res.sendFile(__dirname + "/pages/members.html");
});


// only for authenticated users
const authenticatedUsersOnly = (req, res, next) => {
  if (!req.session.GLOBAL_AUTHENTICATED) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};
app.use(authenticatedUsersOnly);

app.get("*", (req, res) => { 
    res.status(404).sendFile(__dirname + "/pages/page-not-found.html");
});


app.listen(port, () => {
    console.log(`Application is listening at http://localhost:${port}`);
});


    
