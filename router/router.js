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
        response.write("결과값 : " + (parseInt(num1)/parseInt(num2)))

    response.write("</body>");
    response.write("</html>");
    response.end();
});

// 외부에서 사용할 수 있게 만들어주기
 module.exports = router;