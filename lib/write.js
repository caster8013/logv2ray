const request = require('request')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const moment = require('moment')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
    v2rayOnlineIP: [],
    ipDB: [],
    ipDBCount: 0
}).write();

const telecomNameQuery = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if ( response && response.statusCode == 200) {
                resolve(body);
            }
        });
    });
};

let onlineIPs = (ips = []) => {
    let group = [];
    ips.forEach((i) => {
        group.push(ipDBToWrite(i));
    });
    return Promise.all(group);
};

let ipDBToWrite = async (oneIP = "") => {

    let url = "http://freeapi.ipip.net/";
    let result = db.get('ipDB').find(oneIP).value();

    if (result)
        return await result;
    else
        return telecomNameQuery(url + oneIP).then(async (name) => {
            let obj = {};
            obj[oneIP] = name;

            db.get('ipDB').push(obj).write();
            db.update('ipDBCount', n => n + 1).write();
            return await obj;
        });
};

let write = (ipArray = []) => {
    onlineIPs(ipArray).then((group) => {
        let info = {};
        info.moment = moment().format("YYYY-M-D h:mm:ss A ddd");
        info.ips = group.map((i) => Object.keys(i).toString());
        info.ipAmount = info.ips.length;

        db.get('v2rayOnlineIP').push(info).write();
    });
};

module.exports = write;