const { request } = require("express");
const express = require("express");
const Sessionrouter = express.Router();

Sessionrouter.get("/sessionCreate", (req,res) => {

    // 1. session 생성하기 --> session에 저장
    req.session.user = {        // user라는이름표로 {}안의 데이터를담아 session생성
        "id" : "smart",
        "pw" : "123",
        "nick" : "smart"
    }; 

    res.end();                   // 꼭 세션을 끝내겠다는 표시를 해줘야함!!!

})

Sessionrouter.get("/sessionSelect", (req,res) => {

    // 2. session검색하기 -> session에 있는  user값 가져오기
    console.log("session에 있는 user값 : "+req.session.user);

})

Sessionrouter.get("/sessionDelete", (req,res) => {

    // 3. session에 있는 값 삭제하기
    delete req.session.user;

    res.end();
    

})

module.exports = Sessionrouter;