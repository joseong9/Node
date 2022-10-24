const express = require("express");
const EJSrouter = express.Router();

EJSrouter.get("/ejs01", (req, res) => {

    console.log("/ejs01 라우터 실행")

    res.render("ex01EJS", {
        name1 : "value1",
        name2 : "value2"
    });
})




module.exports = EJSrouter;