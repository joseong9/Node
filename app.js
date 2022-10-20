const express = require("express");//설치된 express 사용 선언
const app = express();//express 실행 app 변수에 대입
const router = require("./router/router.js");
const router1 = require("./router/Graderouter.js");
const router2 = require("./router/Joinrouter.js");
const router3 = require("./router/Loginrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const bodyparser = require("body-parser");
let ejs = require("ejs");
app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended:false}));//post 방식일 때 body 영역을 분석해주는 미들웨어

app.use(router3);
app.use(EJSrouter);

app.listen(3000);