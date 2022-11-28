const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    var h = Number(req.body.height);
    var w = Number(req.body.weight);
    var bmi = w / (h*h);
    res.send("The BMI is: " + bmi);
})

app.post("/", function (req, res) {
    var a = Number(req.body.num1);
    var b = Number(req.body.num2);
    var result = a + b;
    res.send("The result is : " + result);
});

app.listen(3000, function () {
    console.log("Running on port 3000");
});