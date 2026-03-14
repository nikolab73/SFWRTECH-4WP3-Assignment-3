const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

const filePath = path.join(__dirname, 'log.txt');

function logging(req, res, next){
    const date = new date();
    const path = req.path;
    const IP = req.IP;
    const query = JSON.stringify(req.query);
    const body = json.stringify(req.body);

    const logLine = '${date}, ${path}, ${IP}, ${query}, ${body}\n';

    fs.appendFile(filePath, logLine, (err) => {
        if (err) console.error('log middleware error', err);
    });

    next();
}