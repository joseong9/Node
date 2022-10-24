const express = require("express");
const DBrouter = express.Router();

const conn = require("../config/DBConfig.js");

DBrouter.post('/Login', (req, res) => {
    /*     console.log("ID :" + req.body.id);
        console.log("PW : "+req.body.pw); */

    let id = req.body.id;
    let pw = req.body.pw;

    let sql = "Select * from member where id = ? and pw = ?";

    conn.query(sql, [id, pw], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("검색이 실패했습니다." + err);
        } else if (row.length > 0) {
            // 로그인성공 부분
            // loginS.html을 ejs파일로 변경하여 views 이동 v
            // Login라우터에서 Login.ejs파일을 랜더링v
            // 랜더링 할 때 로그인에 성공한 id값을 전송v
            // ejs파일에서 로그인에성공한 id값을 출력

            req.session.user = id;      // 현재 로그인에 성공한 사람의 id를 session에 저장

            console.log("session 영역에 id저장 성공" + req.session.user);
            res.render("ex05Logins.ejs", {
                row_id : row
            })
            
        } else if (row.length == 0) {
            // 로그인 실패 부분
            res.redirect("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html");
        }
    })

    /* if (id == 'smart' && pw == '123') {
        res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05Logins.html");       // 경로 재설정해줌
    } else 
        res.redirect ("http://127.0.0.1:5500/nodejs/public/ex05LoginF.html"); */


});


DBrouter.post('/JoinDB', (req, res) => {
    console.log("ID :" + req.body.id);
    console.log("PW : " + req.body.pw);

    // 사용자가 입력한 id : smatr 이고, pw가 123 일때, 성공 -> Logins.html, 실패 -> Login.html
    let id = req.body.id;
    let pw = req.body.pw;
    let nick = req.body.nick;

    let sql = "insert into member values(?, ?, ?)"; // ?의 순서대로 아래 [] 안에 적어주기

    conn.query(sql, [id, pw, nick], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("입력실패 : " + err)

            console.log("입력성공 : " + row.affectedRows);

        } else if (row.affectedRows > 0) {

            console.log("명령에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/Main");

        } else if (row.affectedRows == 0) {

            console.log("삭제된 값이 없습니다.")
        }
    })

});

// 회원삭제 라우터 만들기
// 1. get 방섹의 /Delete 라우터 생성
// 2. 사용자가 입력한 id 값 가져오기
// 3. id 값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제 성공 후 Main.html로 돌아가기

DBrouter.get('/Delete', (req, res) => {
    let id = req.query.id;
    let sql = "Delete from member where id = (?)";

    conn.query(sql, [id], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (!err) {
            console.log("명령에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/Main");
        } else if (row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다.")
        } else {
            console.log("삭제실패 : " + err);
        }
    })

});


DBrouter.post('/Update', (req, res) => {

    // 사용자가 입력한 id 의 pw를 변경하고
    // 성공 후 Main.html페이지로 이동하시오.
    let id = req.body.id;
    let select = req.body.select;       // pw 아니면 nick이 넘어옴
    let data = req.body.data;           // 변경될 데이터가 넘어옴

    let sql;                            // if문이 실행이되면 빠져나올때 선언했던 지역변수가 사라지므로
    if (select == 'pw') {               // 'pw'로 하는 이유는 변수명으로 오는게아니라 text로 넘어오기 때문
        sql = "update member set pw = ? where id = ?";

    } else if (select == 'nick') {
        sql = "update member set nick = ? where id = ?"      // set 어떤데이터를 where 어떻게 
    }

    conn.query(sql, [data, id], (err, row) => {
        if (err) {
            console.log("수정이 실패했습니다.");
        } else if (row.affectedRows > 0) {
            console.log("수정이 성공했습니다." + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/Main");
        } else if (row.affectedRows == 0) {
            console.log(" 수정된 값이 없습니다.")
        }
    })


});

DBrouter.get('/selectAll', (req, res) => {


    let sql = "select * from member"; // 전체 데이터 불러오기

    conn.query(sql, (err, row) => {     // query = db에 명령을 할 수 있는것, row: 검색된 모든데이터가 담겨있음


        if (err) {
            console.log("검색실패 : " + err);
        } else if (row.length > 0) {            //  검색된 데이터 출력문
            console.log("검색된 데이터의 수 : " + row.length)

            res.render("SelectAll", {       // 템플릿 엔진을통해 ejs파일을 row값을 갖고 SelectAll.ejs 렌더링 해주기
                row_names : row
            })

        } else if (row.length == 0) {
            console.log("검색된 데이터가 없습니다.")
        }
    })

});

// 회원 검색 라우터 만들기
// 1. get방식의 /SlectOne라우터 생성
// 2. 사용자가 입력한 id의 정보만 검색해 브라우저 출력
DBrouter.get('/SelectOne', (req, res) => {

    let id = req.query.id;
    let sql = "Select * from member where id = ?";

    conn.query(sql, [id], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (err) {
            console.log("검색이 실패했습니다.")
        } else if (row.length > 0) {
            console.log("검색된 데이터의 수 : " + row.length);
            console.log(row);
            res.render("SelectOne", {
                row_name : row
            })

        } else if (row.length == 0) {
            console.log("검색된 값이 없습니다.");
        }
    })
});

DBrouter.get('/SelectDelete', (req, res) => {
    let id = req.query.id;
    let sql = "Delete from member where id = (?)";

    conn.query(sql, [id], (err, row) => {     // query = 명령을 할 수 있는것 (db에)
        if (!err) {
            console.log("명령에 성공한 수 : " + row.affectedRows);
            res.redirect("http://127.0.0.1:3001/SelectAll");
        } else if (row.affectedRows == 0) {
            console.log("삭제된 값이 없습니다.")
        } else {
            console.log("삭제실패 : " + err);
        }
    })

});

DBrouter.get("/Main", (req, res) =>{    // Main.ejs 실행시키기 위해선 라우터가 있어야함

    res.render("Main", {            
        id : req.session.user
    })      //  라우터안에서 id값을 Main에게 전달해주어야함

});

DBrouter.get("/Logout", (req, res) =>{    // Main.ejs 실행시키기 위해선 라우터가 있어야함

    delete req.session.user;                  // session에있는 id 삭제

    res.render("Main", {            
        id : req.session.user                 // null 상태로 전달 -> 메인의 상태가 로그인으로 바뀜
    })      //  라우터안에서 id값을 Main에게 전달해주어야함

});

// 외부에서 사용할 수 있게 만들어주기
module.exports = DBrouter;