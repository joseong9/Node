const express = require("express");//설치된 express 사용 선언
const app = express();//express 실행 app 변수에 대입
const router = require("./router/router.js");
const router1 = require("./router/Graderouter.js");
const router2 = require("./router/Joinrouter.js");
const router3 = require("./router/Loginrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const bodyparser = require("body-parser");
const Sessionrouter = reqire("./router/Sessionrouter.js")
let ejs = require("ejs");

let conn_session = new mysql_session(conn);     // 실제 사용할수있는 정보인지 검사
app.use(session({      // 미들웨어로 세션기능 등록(저장위치 : mysql)
    secret : "smart",
    resave : false,                      // 서버에 저장할건지안할건지
    saveUninitialized : true,            // 매번 서버를 시작할때 서버를 초기화 할건지 아닌지
    store : conn_session                 // 저장되는 공간을 설정해주기
}));

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:false}));//post 방식일 때 body 영역을 분석해주는 미들웨어

app.use(router3);
app.use(EJSrouter);

app.listen(3000);