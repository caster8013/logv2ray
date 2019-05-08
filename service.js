const schedule = require('node-schedule');
const ns = require('./lib/netstat');

(() => {

    let rule = new schedule.RecurrenceRule();
    rule.minute = [0,5,10,15,20,25,30,35,40,45,50,55,60];
    
    schedule.scheduleJob(rule,() => {
        ns();
    });
})();