const express = require('express')
var fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, 'OTA_HotelResNotifRS-Commit.xml');
const app = express();
const port = 8080

app.post('/reservation', (req, res) => {
    console.log(req.body);
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data) {
        res.type('application/xml');
        res.status(200).send(data);
    });
});

app.listen(port, () => console.log(`OTA Simulator listening on port ${port}!`))
