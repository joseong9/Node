const express = require("express");//설치된 express 사용 선언
const app = express();//express 실행 app 변수에 대입
const router = require("./router/router.js");

app.use(router);

app.listen(3000);