const express = require('express')
const app = express()
var cors = require('cors')
const request = require('request');
const bodyParser = require("body-parser");
const appKey = 'e8a0da77-a86b-42b1-856e-0b01c21eba27'
const endPoint = "http://124.220.2.99:4312/Thingworx/Things/"

app.use(cors())

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/GetPropertyValues', function (req, res) {
    console.log("request in backend")
    GetPropertyValues(req, res)
})
app.listen(3300)

function GetPropertyValues(req, res) {
    const reqBody = req.body
    console.log("'reqbody", reqBody)
    const thingName = reqBody.thingName
    const service = reqBody.thingService
    const options = {
        url: endPoint + thingName + '/Services/' + service,
        method: "POST",
        json: true, // Very important!!!
        headers: {
            'appKey': appKey,
            'Accept': 'application/json'
        },
        body: {}
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        } else {
            res.send(error)
        }
    }

    request(options, callback);
}

