const mysql = require('mysql');

let conn = mysql.createConnection({     // conn으로 DB에 값을 입력을 할 수 있음
    host : "127.0.0.1",
    user : "root",
    password : "whtjdrms!q2w",
    port : "3306",
    database : "nodejs_DB"
});

module.exports = conn;