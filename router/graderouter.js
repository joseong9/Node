const express = require("express");

const router = express.Router();         // express가 가지고있는 기능중에서 라우터 기능 사용을 선언해줌

router.post('/Grade', (req, res) => {
    const Grade = (parseInt(req.body.java) + parseInt(req.body.web) + parseInt(req.body.iot) + parseInt(req.body.android)) / 4
    console.log("이름 :" + req.body.name);
    console.log("자바 :" + req.body.java);
    console.log("웹 :" + req.body.web);
    console.log("IoT :" + req.body.iot);
    console.log("안드로이드 :" + req.body.android);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<html>");
    res.write("<body>");
    res.write("<결과> <br>");
    res.write("이름 :" + req.body.name + '<br>');
    res.write("자바 :" + (parseInt(req.body.java)) + "<br>");
    res.write("웹 :" + (parseInt(req.body.web)) + "<br>");
    res.write("IoT :" + (parseInt(req.body.iot)) + "<br>");
    res.write("안드로이드 :" + (parseInt(req.body.android)) + "<br>");
    res.write("avg :" + (parseInt(req.body.java) + parseInt(req.body.web) + parseInt(req.body.iot) + parseInt(req.body.android)) / 4 + "<br>");
    if (Grade < 101 & Grade > 94) {
        res.write("Grade:" + "A+")
    } else if (Grade < 95 & Grade > 89) {
        res.write("Grade:" + "A")
    } else if (Grade < 90 & Grade > 84) {
        res.write("Grade:" + "B+")
    } else if (Grade > 85 & Grade > 79) {
        res.write("Grade:" + "C+")
    } else if (Grade > 80 & Grade > 76) {
        res.write("Grade:" + "C")
    } else
        res.write("Grade:" + "F")

    res.write("</body>");
    res.write("</html>");
});

module.exports = router;