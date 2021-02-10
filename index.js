const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser'); 
const port = process.env.PORT || 3000;


function makeid(length, characterSet) {
    var result           = '';
    var characters       = characterSet;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const app = express();
var NODESESSID = makeid(20,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#%^')

// parse requests of content-type: application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.cookie('NODESESSID', NODESESSID);
    res.sendFile(path.join(__dirname + '/index.html'));
    }); 

// simple route
app.get("/api/randpass", (req, res) => {
    res.cookie('NODESESSID', NODESESSID);
    var length = req.query.length
    var charset = req.query.charset
    var password = makeid(length, charset);
    res.json([
        {
            password: password 
        }
    ]);
    console.log(password);
});

// set port, listen for requests
app.listen(port, function() {
    console.log("App is running on port " + port);
});