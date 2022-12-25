const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { json } = require("body-parser");
const port = 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const https = require("https");

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };
    const jasonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/f95bc7c271";

    const options = {
        method: "POST",
        auth: "jeff:d599ea0486df52635c980d7922e29ac9-us21"
    }

   const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/faliur.html");
    }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jasonData);
    request.end();
});

app.post("/faliur", function(req,res){
    res.redirect("/");
});

app.listen(port, function(){
    console.log("server is running");
});

// api key
// d599ea0486df52635c980d7922e29ac9-us21

//id
