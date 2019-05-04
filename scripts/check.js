const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    v2rayOnlineIP: [],
    ipDB: [],
    ipDBCount: 0
}).write();

let foo = db.get("v2rayOnlineIP").value();

foo.forEach(element => {
    if (element.ipAmount >= 10) console.log(element);
});