const express = require("express");

const EJSrouter = express.Router();

EJSrouter.get("/ejs01", (req, res) => {
    console.log('ejs 호출')
    res.render("ex01EJS", {
        name : "value",
        name2 : "value2"
    });
})

module.exports = EJSrouter