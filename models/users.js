const sqlLite = require('sqlite');
const sqlLite3 = require('sqlite3');
const bcrypt = require('bcrypt')

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
    let user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (!user) return null;
    let match = await bcrypt.compare(password, user.password);
    if (match) return user;
    else return null;
}

async function addUser(username, password){
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO Users VALUES (?,?,?)", [username, hashedPassword, "member"]);
}

async function checkForUser(username){
    let existent = db.get("SELECT * FROM users WHERE username = ?", [username]);
    return existent;
}

module.exports = {getUsers, addUser, checkForUser};