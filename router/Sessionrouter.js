const Sessionrouter = expres.Router();

Sessionrouter.get("/sessionCreate", (req,res) => {
    req.session.user = {
        "id" : "smart",
        "pw" : "123",
        "nick" : "smart"
    };
    res.end();
})
