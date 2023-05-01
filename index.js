const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const node_session_secret = '95951b38-e2b2-458f-9c7c-f0b06ecc58b1';


app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: node_session_secret,
    saveUninitialized: false,
    resave: true
}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/signup", (req, res) => { 
    res.sendFile(__dirname + "/pages/signup.html");
});

app.get("/login", (req, res) => { 
    res.sendFile(__dirname + "/pages/login.html");
});

app.get("*", (req, res) => { 
    res.status(404).sendFile(__dirname + "/pages/page-not-found.html");
});

app.post("/members", (req, res) => { 
    var user
});



app.listen(port, () => {
    console.log(`Application is listening at http://localhost:${port}`);
});


    
