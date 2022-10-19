const express = require("express");

const router = express.Router();         // express가 가지고있는 기능중에서 라우터 기능 사용을 선언해줌


router.post('/join', (req, res) => {
    console.log("ID :" + req.body.id);
    console.log("PW : "+req.body.pw);
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

// 외부에서 사용할 수 있게 만들어주기
module.exports = router;