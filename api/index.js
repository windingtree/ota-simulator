const fs = require('fs');
const path = require('path');
const util = require('util');
const RESPONSES_FOLDER = path.join(__dirname, 'responses');

const fsReadDirAsync=util.promisify(fs.readdir);
const fsStatAsync=util.promisify(fs.stat);
const fsReadFileAsync=util.promisify(fs.readFile);

module.exports = async (req, res) => {
    let {query:{ota}} = req;
    if (!ota || !await fileExists(ota)) {
        let files = await getAvailableFiles();
        res.send(`File "${ota}" does not exist. \nAvailable files:\n${files.join('\n')}`);
        return;
    }
    let filePath = path.join(RESPONSES_FOLDER, ota);
    let data=await fsReadFileAsync(filePath, {encoding: 'utf-8'});
    res.setHeader('Content-Length', data.length);
    res.end(data);
}

const getAvailableFiles = async () => {
    let files = await fsReadDirAsync(RESPONSES_FOLDER);
    return files;
}
const fileExists = async (fname) =>{
    if (fname.indexOf('..') > -1) { //don't let the user go up from the current folder!
        return false;
    }
    let filePath = path.join(RESPONSES_FOLDER, fname);
    try{
        await fsStatAsync(filePath);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}
