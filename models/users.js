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

init();

async function getUsers(username, password){
    let result = await db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
    return result;
}

async function addUser(username, password){
    await db.run("INSET INTO Users VALUES (?,?,?)", [username, password, "member"]);
}

module.exports = {getUsers, addUser};