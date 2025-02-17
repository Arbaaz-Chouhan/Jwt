const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretkey";

app.post('/login', (req, res) => {
    const user = { id: 1, username: "Arbaaz Chouhan", email: "arbaaz@test.com" };
    jwt.sign({ user }, secretKey, { expiresIn: "1h" }, (err, token) => {
        res.json({ token });
    })
});

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.send({ result: "invalid Token" });
        } else {
            res.json({ message: "user is verify", authData });

        }
    })
})

function verifyToken(req, res, next) {
    const beareHeader = req.headers["authorization"];
    if (typeof beareHeader !== "undefined") {
        const bearer = beareHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
}


app.listen(5000, () => {
    console.log(`Server started on 5000`);
});