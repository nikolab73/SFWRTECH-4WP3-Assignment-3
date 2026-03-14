const sqlLite = require('sqlite');
const sqlLite3 = require('sqlite3');

async function init(){
    try{
        db = await sqlLite.open({
            filename: 'database.db',
            driver: sqlLite3.Database
        });
    }
    catch(err) {
        console.error(err);
    }
}