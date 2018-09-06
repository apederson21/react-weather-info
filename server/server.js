'use strict';

const   express = require('express'),
        http = require("http"),
        port = process.env.PORT || 3001,
        weather = require('./weather');

let app = express();

// setup middleware
const   bodyParser = require('body-parser'),
        helmet = require('helmet');

app.use(helmet());
// json encode post bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// load routes
app.get('/get-weather', (req, res) => {
    weather.getLatLong(req.query.loc)
        .then((data) => {
            return weather.getWeather(data);
        })
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(400).send({
                error: err
            });
        });
});

// open port
http.createServer(app).listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
