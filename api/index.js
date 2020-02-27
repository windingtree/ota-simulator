var fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, 'OTA_HotelResNotifRS-Commit.xml');

module.exports = (req, res) => {
    let body = [];
    
    // WHen HTTP Data is received, we push it to the body
    req.on('data', (chunk) => {
        body.push(chunk);
    });

    // Once we have everything, we answer
    req.on('end', (chunk) => {
        // Extract the body
        body = Buffer.concat(body).toString();
        console.log(body);
        
        // Send the answer
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data) {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(data);
        });
    });

};