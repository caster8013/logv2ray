const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const moment = require('moment')

const adapter = new FileSync('db-old.json')
const db = low(adapter)

const newAdapter = new FileSync('db.json')
const newDB = low(newAdapter)

newDB.defaults({
    v2rayOnlineIP: [],
    ipDB: [],
    ipDBCount: 0
}).write();

let a = db.get("v2rayOnlineIP").value();

a.forEach((i, index) => {
    let obj = {};
    obj.moment = moment.unix(i.timestamp).format("YYYY-M-D h:mm:ss A ddd");
    obj.ips = i.ips.map((i) => Object.keys(i).toString());
    obj.ipAmount = obj.ips.length;
    newDB.get('v2rayOnlineIP').push(obj).write();
});

let b = db.get("ipDB").value();
let c = db.get("ipDBCount").value();


newDB.update('ipDBCount', n=>c).write()

b.forEach((element, index) => {
    newDB.get('ipDB').push(element).write();
});