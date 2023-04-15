//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastname = req.body.lName;
    const emailadd = req.body.email;

    const data = {
        members: [
            {
                email_address: emailadd,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/846bd6652c";

    const options = {
        method: "POST",
        auth: "Anand:cff60e8cc048beca6dff08a6f369b488-us21"
    }

    const request = https.request(url, options, function(response){
        
        if(response.statusCode == 200){
            res.send("Full on sex");
        }
        else
        {
            res.send("NO sex");
        }
        
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
});




//API KEY:-  cff60e8cc048beca6dff08a6f369b488-us21
//audiance id:- 846bd6652c