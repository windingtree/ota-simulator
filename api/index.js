var fs = require('fs');
var path = require('path');
const url = require('url');

const responses = {
    'getOTAHotelRes': path.join(__dirname, 'OTA_HotelResNotifRS-Commit.xml'),
    'cancel': path.join(__dirname, 'OTA_HotelResNotifRS-Cancel.xml'),
    'getOTAHotelAvailability': path.join(__dirname, 'OTA_HotelAvailRS.xml')
}
const DEFAULT = 'getOTAHotelRes';

module.exports = (req, res) => {
    let body = [];

    // WHen HTTP Data is received, we push it to the body
    req.on('data', (chunk) => {
        if (body.length === 0) {
            res.setHeader('Content-Type', 'text/xml;charset=UTF-8');
            res.status(200);
        }
        body.push(chunk);
    });

    // Once we have everything, we answer
    req.on('end', (chunk) => {
        // Extract the body
        body = Buffer.concat(body).toString();
        console.log(body);

        // Determine which file to serve
        const queryObject = url.parse(req.url, true).query;
        let filePath;
        if (queryObject.ota !== undefined) {
            filePath = responses[queryObject.ota];
        }
        if (!filePath)
            filePath = responses[DEFAULT];
        // Send the answer
        fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
            res.setHeader('Content-Length', data.length);
            res.end(data);
        });
    });

};
