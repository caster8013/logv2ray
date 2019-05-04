### frontend

entry:
index.js


### scripts

check.js:
input db.json, output the moment info which the ip amount above or equal 10.

rewrite.js:
db.json reconstruct scripts.


### service

npm run service

> Log online IPs every 5 minutes. Query every ip by which telecom operator it belongs, write the telecom operator name to ipDB in db.json. write the moment info (moment, IPs, ip amount) to v2rayOnlineIP in db.json.

1. install nodejs and npm

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

1.5 fix es6 compatible issue
npm install --save-dev babel-preset-env babel-cli

2. local storage

https://github.com/typicode/lowdb

npm install lowdb --save

3. Nodejs定时任务（node-schedule)

https://www.jianshu.com/p/8d303ff8fdeb


npm install node-schedule --save

4. node module reading netstat data

npm install node-netstat --save 

5. Request - Simplified HTTP client

npm i request --save

6. forever client tool

sudo npm install forever -g
sudo forever start service