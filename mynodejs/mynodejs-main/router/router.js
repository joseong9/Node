const express = require("express");
const router = express.Router();         // express가 가지고있는 기능중에서 라우터 기능 사용을 선언해줌



router.get("/plus",(request, response) => {    // plus라우터 기능정의 및 등록, get 방식으로 가져옴, plus로 들어올때 함수가 실행됨 -> 미들웨어로 등록해줘야함
    console.log("/plus 라우터 호출");
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));                // html문서에 있는 name의 num1, num2를 가져오기  -> 웹페이지 화면에 나오게 해야함

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});        // 1.웹 브라우저에 응답 해주기 (표시해주기), 응답을 위한 비어있는 html 파일을 만들어준다?
    response.write("<html>");             // 2. html란에다가 글을 입력해줌
    response.write("<body>");
    response.write("응답성공<br>");
    response.write("결과값 : " + (parseInt(request.query.num1)+parseInt(request.query.num2)));          // 문자열 + 숫자열 = 문자열 이므로 숫자열 합을 하는 부분에다가 소괄호를 씌워준다
    response.write("</body>");  
    response.write("</html>");
    response.end();         // -> 3. end가 실행되면 html코드가 실행됨

});

router.get("/cal", (request, response) => {     // cal 라우터 기능정의 및 등록
    //1. 사용자가 입력한 값을 가져오기.
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;

    console.log(num1 + cal + num2);

    // 사용자가 입력한 기호에 맞는 연산결과값을 브라우저에 출력하세요.

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});      //1. 비어있는 html 파일 생성
    response.write("<html>");
    response.write("<body>");
    response.write("응답");
    if(cal == "+") {
        response.write("결과값 : " + (parseInt(num1)+parseInt(num2)))
    } else if(cal == "-") {
        response.write("결과값 : " + (parseInt(num1)-parseInt(num2)))
    } else if(cal == "*") {
        response.write("결과값 : " + (parseInt(num1)*parseInt(num2)))
    } else
        response/write("결과값 : " + (parseInt(num1)/parseInt(num2)))

    response.write("</body>");
    response.write("</html>");
    response.end();
});


router.post('/Grade', (req, res) => {           // post방식의 기능정의 및 등록

    const Grade = (parseInt(req.body.java)+parseInt(req.body.web)+parseInt(req.body.iot)+parseInt(req.body.android))/4
    console.log("이름 :" + req.body.name);
    console.log("자바 :" + req.body.java);
    console.log("웹 :" + req.body.web);
    console.log("IoT :" + req.body.iot);
    console.log("안드로이드 :" + req.body.android);

    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    res.write("<html>");
    res.write("<bodyl>");
    res.write("<결과> <br>");
    res.write("이름 :" + req.body.name + '<br>');
    res.write("자바 :"+ (parseInt(req.body.java))+"<br>");
    res.write("웹 :"+ (parseInt(req.body.web))+ "<br>");
    res.write("IoT :"+ (parseInt(req.body.iot))+"<br>");
    res.write("안드로이드 :"+ (parseInt(req.body.android))+"<br>");
    res.write("avg :" + (parseInt(req.body.java)+parseInt(req.body.web)+parseInt(req.body.iot)+parseInt(req.body.android))/4+"<br>");

    if(Grade < 101 & Grade > 94) {
        res.write("Grade:" + "A+")
    } else if(Grade < 95 & Grade > 89 ) {
        res.write("Grade:" + "A")
    } else if(Grade < 90 & Grade > 84) {
        res.write("Grade:" + "B+")
    } else if(Grade > 85 & Grade > 79) {
        res.write("Grade:" + "C+")
    } else if(Grade > 80 & Grade > 76) {
        res.write("Grade:" + "C")
    } else
        res.write("Grade:" + "F")
    res.write("</body>");
    res.write("</html>");
});

router.post('/join', (req, res) => {
    console.log("ID :" + req.body.id);
    console.log("NAME : "+req.body.name);
    console.log("EMAIL : "+req.body.email);
    console.log("TEL : " + req.body.tel);
    console.log("GENDER : " + req.body.gender);
    console.log("HOBBY : " + req.body.hobby);
    console.log("BIRTHDAY : " + req.body.birth);
    console.log("COLOR : " + req.body.color);
    console.log("COUNTRY : " + req.body.country);
    console.log("TALK : " + req.body.talk);

    res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
    res.write("<html>");
    res.write("<bodyl>");

    res.write("ID :" + req.body.id + '<br>');
    res.write("EMAIL :" + req.body.email + '<br>');
    res.write("TEL :" + req.body.tel + '<br>');
    res.write("GENDER :" + req.body.gender + '<br>');
    res.write("HOBBY :" + req.body.hobby + '<br>');
    res.write("BIRTHDAY :" + req.body.birth + '<br>');
    res.write("COLOR :" + req.body.color + '<br>');
    res.write("COUNTRY :" + req.body.country + '<br>');
    res.write("TALK :" + req.body.talk + '<br>');

    res.write("</body>");
    res.write("</html>");
    res.end();
});




module.exports = router;