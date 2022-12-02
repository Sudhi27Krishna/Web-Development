const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "ee187d46bbedfff74fba51482862b6a5";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatheDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is: " + temp + " degree Celsius</h1>");
            res.write("<p>The weather currently is: " + weatheDescription + ".</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});



app.listen(3000, function () {
    console.log("Server running on port 3000");
});