const netstat = require('node-netstat');
const write = require("./write");

netstat.parsers.linux = netstat.parserFactories.linux({
    parseName: true,
});

const promise = () => {
    return new Promise((resolve, reject) => {

        let items = [];

        netstat({
            filter: {
                state: 'ESTABLISHED',
                processName: 'nginx: worker'
            },
            done: () => {
                resolve(items);
            }
        }, item => {
            items.push(item);
        });

    });
};

let ns = () => {
    promise()
        .then(async (items) => {
            let a = items.filter((i) => {
                return i.local.port == 443 && i.remote.address != '127.0.0.1';
            });

            let b = a.map((i) => {
                return i.remote.address;
            });

            let c = b.filter((element, index) => {
                return b.indexOf(element) == index;
            });

            return await c;
        })
        .then((ips) => {
            console.log(ips);
            write(ips);
        });
};

module.exports = ns;