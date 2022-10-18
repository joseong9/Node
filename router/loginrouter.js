const express = require("express");
const mysql = require("mysql")
const router = express.Router();         // express가 가지고있는 기능중에서 라우터 기능 사용을 선언해줌

let conn = mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password : "whtjdrms!q2w",
    port : "3306",
    database : "nodejs_db"
});

router.post('/Login', (req, res) => {
    let id = req.body.id
    let pw = req.body.pw

    if (id == 'smart' && pw == '123') {
        res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06logins.html");
    } else {
        res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06loginf.html");
    }
});

router.post('/Join', (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;
    let nick = req.body.nick;
    let sql = "insert into member values(?, ?, ?)";
    conn.query(sql, [id, pw, nick], (err, row) => {
        if (!err){
            console.log("입력성공 :" + row);
            res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06main.html")
        } else {
            console.log("입력실패 :" + err);
        }
    })
});

router.get('/Delete', (req, res) => {
    let id = req.query.id;
    let sql = "DELETE FROM member where id=(?)";
    conn.query(sql, [id], (err, row) => {
        if (row.affectedRows>0){
            console.log("삭제성공 :" + row.affectedRows);
            res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06main.html")
        } else if(row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다")
        } else {
            console.log("삭제실패 :" + err);
        }
    })
});

// 외부에서 사용할 수 있게 만들어주기
module.exports = router;