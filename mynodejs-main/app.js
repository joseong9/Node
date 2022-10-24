
const express = require("express");                       // 설치된 express를 사용하는 선언
const app = express();                                    // express 실행해서 app이라는 변수에 담아주기, 127.0.0.1 => 몇번 방에서 실행할것인지 까지를 정해줘야함
//console.log("확인");


const router = require("./router/router.js");   
const DBrouter = require("./router/DBrouter.js");       // router폴더안의 router.js파일을 가져와 변수로 선언해주기
const bodyparser = require("body-parser");
const EJSrouter = require("./router/EJSrouter.js");
const Sessionrouter = require("./router/Sessionrouter.js");



let ejs = require("ejs");           // ejs 사용정의


const session = require("express-session");   // 세션기능
const mysql_session = require("express-mysql-session");    // 세션이 저장되는 영역 (mysql)
// -> 미들웨어로 등록 시켜줘야함

  
app.set("view engine", "ejs"); 
// set : 이미 있는 속성중 하나, use : 임의로 사용하겠다


// mysql을 담고있는 정보가 들어감
let conn = {
    host : "127.0.0.1",
    user : "root",
    password : "rtq134679@",
    port : "3306",
    database : "nodejs_DB"
}

let conn_session = new mysql_session(conn);     // 실제 사용할수있는 정보인지 검사
app.use(session({      // 미들웨어로 세션기능 등록(저장위치 : mysql)
    secret : "smart",
    resave : false,                      // 서버에 저장할건지안할건지
    saveUninitialized : true,            // 매번 서버를 시작할때 서버를 초기화 할건지 아닌지
    store : conn_session                 // 저장되는 공간을 설정해주기
}));

app.use(express.static("./public"));                    // static : css. js 적용을위함
app.use(bodyparser.urlencoded({extended:false}));       // post방식일 때 body 영역을 분석해주는 미들웨어로 bodyparser등록, 순서는 라우터 등록 전에 미들웨어 등록 해야함
app.use(router); 
app.use(DBrouter); 
app.use(EJSrouter);                                    // 서버에서사용하겠다고 미들웨어로 router 등록 해야함
app.use(Sessionrouter);

app.listen(3001);                                      // 현재 서버파일의 포트번호를 설정해주기 


        