// jshint esversion: 6 
const express = require('express');
const bodyParser  = require("body-parser");
const request = require("request");
const req = require('express/lib/request');
const res = require('express/lib/response');
const https  = require("https");
const { url } = require('inspector');
const { options } = require('request');

const app = express();
app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
// Get request From Index HTMl 

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})
// Post Request 
app.post("/",(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var emaill = req.body.email;
    var data = {
        members:[{
            email_address: emaill,
            status: "subscribed",
            merg_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/90bef01ba5"
    
    const options = {
        method:"POST",
        auth:"sojib:c38e8fcb7984d9a0ac705c1602724b17-us14",
    }

    const request =  https.request(url,options,(response)=>{ 
        response.on("data",(data)=>{
            var code =  response.statusCode
            if (code===200){
                res.sendFile(__dirname+"/success.html");
            };


    });
        });
    request.write(jsonData);
    request.end()    ;
});


app.listen(process.env.PORT || 3000,function(){
    console.log('Server is ruuning on port localhost:3000');
});

// var port_number = server.listen(process.env.PORT || 3000);
// app.listen(port_number);


// c38e8fcb7984d9a0ac705c1602724b17-us14

// 90bef01ba5    #audience ID