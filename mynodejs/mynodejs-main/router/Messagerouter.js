const express = require("express"); // 라우터 기능을 불러오기위해 express 가져오기
const Messagerouter = express.Router();
const conn = require("../config/DBConfig.js")
//DB정보등록(conn)


//app.js 미들웨어 등록해주기

Messagerouter.get("/Message", (req,res) => {

    let sql = "select * from web_message where rec=?";

    if(req.session.user){
        conn.query(sql, [req.session.user.email], (err,row) => {
            res.render("message", {
                user : req.session.user,
                row_name : row
            });
            // console.log(row);
        })
    } else {
        res.render("message", {
            user : req.session.user
        });
    }
    
})

Messagerouter.get("/MessageLogout", (req, res)=> {

    delete req.session.user;

    res.redirect("http://127.0.0.1:3001/Message")
})

Messagerouter.post("/MessageJoin", (req, res) =>{

    let email = req.body.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;

    let sql = "insert into web_member values(?, ?, ?, ?, now())"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [email, pw, tel, address], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("입력실패 : " + err);

        } else if (row.affectedRows > 0) {

            console.log("명령에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/Message");

        } else if (row.affectedRows == 0) {

            console.log("삭제된 값이 없습니다.");
        }
    })  

});

Messagerouter.post('/MessageLogin', (req, res) => {
    /*     console.log("ID :" + req.body.id);
        console.log("PW : "+req.body.pw); */

    let email = req.body.email;
    let pw = req.body.pw;

    let sql = "Select * from web_member where email = ? and pw = ?";

    conn.query(sql, [email, pw], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("검색이 실패했습니다." + err);
        } else if (row.length > 0) {

            req.session.user = {
                "email" : row[0].email,
                "tel" : row[0].tel,
                "address" : row[0].address
            };      // 현재 로그인에 성공한 사람의 정보를 session에 저장

            console.log("session 영역에 정보저장 성공" + req.session.user);

            res.redirect("http://127.0.0.1:3001/Message");

            console.log(row);
            
        } else if (row.length == 0) {
            // 로그인 실패 부분
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html");
        }
    })

});

Messagerouter.get("/MessageUpdate", (req, res) =>{

    res.render("update",{
        user : req.session.user
    })
});

Messagerouter.post("/MessageUpdateExe", (req, res) =>{

    let email = req.session.user.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;

    let sql = "update web_member set pw=?, tel=?, address=? where email = ?"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [pw, tel, address, email], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("수정실패 : " + err);

        } else if (row.affectedRows > 0) {

            console.log("수정에 성공한 수 : " + row.affectedRows);
            req.session.user = {
                "email" : email,
                "tel" : tel,
                "address" : address
            }
            res.redirect("http://127.0.0.1:3001/Message");

        } else if (row.affectedRows == 0) {

            console.log("수정된 값이 없습니다.");
        }
    })  

});

Messagerouter.get('/MessageMemberSelect', (req, res) => {

    let sql = "Select * from web_member";

    conn.query(sql, (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("검색이 실패했습니다." + err);
        } else if (row.length > 0) {

            res.render("selectmember", {
                row_name : row
            })
            console.log(row);
            
        } else if (row.length == 0) {
            // 검색 실패 부분
            res.redirect("http://127.0.0.1:3001/Message");
        }
    })

});

Messagerouter.get("/MessageDelete", (req, res) =>{

    let email = req.query.email;

    let sql = "delete from web_member where email=?"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [email], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("삭제실패 : " + err);

        } else if (row.affectedRows > 0) {

            console.log("삭제에 성공한 수 : " + row.affectedRows);
            req.session.user = {
                "email" : email,
                "tel" : tel,
                "address" : address
            }
            res.redirect("http://127.0.0.1:3001/MessageMemberSelect");

        } else if (row.affectedRows == 0) {

            console.log("삭제된 값이 없습니다.");
            res.redirect("http://127.0.0.1:3001/MessageMemberSelect");
        }
    })  

});

Messagerouter.post("/Messagesend", (req, res) =>{

    let send = req.body.send;
    let rec = req.body.rec;
    let content = req.body.content;

    let sql = "insert into web_message(send, rec, content, send_date) values(?, ?, ?, now())"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [send, rec, content], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("입력실패 : " + err);

        } else if (row.affectedRows > 0) {

            console.log("입력에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/Message");

        } else if (row.affectedRows == 0) {

            console.log("입력된 값이 없습니다.");
        }
    })  

});

module.exports = Messagerouter;