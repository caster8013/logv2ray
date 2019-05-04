const netstat = require('node-netstat');
const r = require("./write");

netstat.parsers.linux = netstat.parserFactories.linux({
    parseName: true,
});

const promise = () => {
    return new Promise((resolve, reject) => {

        let items = [];

        netstat({
            filter: {
                state: 'ESTABLISHED',
                processName: 'nginx: worker p'
            },
            done: () => {
                resolve(items);
            }
        }, item => {
            items.push(item);
        });

    });
};

exports.netstat = () => {
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
            r.queue(ips);
        });
};