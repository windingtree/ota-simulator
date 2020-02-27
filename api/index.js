var fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, 'OTA_HotelResNotifRS-Commit.xml');

module.exports = (req, res) => {
    console.log(req.body);
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(data);
    });
};