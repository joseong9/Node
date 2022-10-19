const express = require("express");
const router = express.Router();         // express가 가지고있는 기능중에서 라우터 기능 사용을 선언해줌
const conn = require("../config/DBConfig.js");

router.post('/Login', (req, res) => {
    let id = req.body.id;
    let pw = req.body.pw;
    let sql = "select * from member where id= ? and pw = ?";
    conn.query(sql, [id, pw], (err, row) => {
        if (err) {
            console.log("검색 실패 : " + err);
        } else if (row.length > 0) {
            res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06logins.html");
        } else if (row.length == 0) {
            res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06loginf.html");
        }
    })
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
        if (err){
            console.log("삭제실패 :" + err);
        } else if(row.affectedRows > 0) {

            console.log("삭제성공 :" + row.affectedRows);
            res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06main.html")
            
        } else if(row.affectedRows == 0) {

            console.log("삭제된 값이 없습니다")
            res.redirect("http://127.0.0.1:5500/05.mynodejs/mynodejs/public/ex06delfail.html")
            
        }
    })
});

router.post('/Update', (req, res) => {
    let id = req.body.id;
    let select = req.body.select;
    let data = req.body.data;
    
    let sql = "";

    if(select='pw'){
        sql = "UPDATE member set pw = ? WHERE id = ?";
    } else {
        sql = "UPDATE member set nick = ? WHERE id = ?";
    }

    //let sql = `update member set ${select} = ? where id = ?`

    conn.query(sql, [data, id], (err, row) => {
        if (err) {
            console.log("수정 실패 :" + err);
        } else if(row.affectedRows > 0) {
            console.log("수정 성공 :" + row.affectedRows);
        } else if(row.affectedRows == 0) {
            console.log("수정된 값이 없습니다")
        }
    })
});

router.get('/SelectAll', (req, res) => {
    let sql = "select * from member";
    conn.query(sql, (err, row) => {

        if(err) {
            console.log("검색 실패 : " + err);
        } else if (row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.length);
            
            
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            res.write("<html>");
            res.write("<body>");
            res.write("<table border='1'>")
            res.write("<tr>")
            res.write("<th>ID</th>")
            res.write("<th>PW</th>")
            res.write("<th>NICK</th>")
            res.write("</tr>")
            
            for (i = 0; i<row.length; i++){
                res.write("<tr>")
                res.write("<td>" + row[i].id + "</td>");
                res.write("<td>" + row[i].pw + "</td>");
                res.write("<td>" + row[i].nick + "</td>");
                res.write("</tr>")
            }
            res.write("</table>")
            res.write("</body>");
            res.write("</html>");
            res.end();
        } else if (row.length == 0) {
            console.log("검색된 데이터가 없습니다")
        }
    })
});

router.get('/SelectOne', (req, res) => {
    let id = req.query.id;
    let sql = "select * from member where id = ?";
    conn.query(sql, [id], (err, row) => {

        if(err) {
            console.log("검색 실패 : " + err);
        } else if (row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.length);
            
            
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            res.write("<html>");
            res.write("<body>");
            res.write("<table border='1'>")
            res.write("<tr>")
            res.write("<th>ID</th>")
            res.write("<th>PW</th>")
            res.write("<th>NICK</th>")
            res.write("</tr>")
            
            for (i = 0; i<row.length; i++){
                res.write("<tr>")
                res.write("<td>" + row[i].id + "</td>");
                res.write("<td>" + row[i].pw + "</td>");
                res.write("<td>" + row[i].nick + "</td>");
                res.write("</tr>")
            }
            res.write("</table>")
            res.write("</body>");
            res.write("</html>");
            res.end();
        } else if (row.length == 0) {
            console.log("검색된 데이터가 없습니다")
        }
    })
});
// 외부에서 사용할 수 있게 만들어주기
module.exports = router;