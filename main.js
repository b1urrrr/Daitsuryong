var http = require("http");
var fs = require("fs");
var url = require("url");
var template = require("./lib/template.js"); // base.html 코드를 JS 객체로 만들어서 분리!
var path = require("path"); // 입력 정보 보안을 위해 가지고 옵니다.
var qs = require("querystring");
var express = require("express"); // express Node.js 위에서 동작하는 웹 프레임워크
var db = require("./lib/db.js"); // db 사용을 위한 설정
var product = require("./lib/productHTML.js"); // 물품 관련 html
var ejs = require("ejs");
var moment = require("moment");

var app = express(); // applicationn 객체 반환
const router = express.Router();
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var session = require("express-session");

app.use(express.static("public")); // public 폴더에 있는 static file 사용을 위해 추가
app.set("view engine", "ejs");

// 루트 경로로 접속 시 로그인 페이지로 이동
app.get("/", function (req, res) {
  res.render("login.ejs");
});

//로그인
app.post("/", function (req, res) {
  var userid = req.body.id;
  var password = req.body.pw;

  console.log(req.body.id);
  console.log(req.body.pw);
  if (userid && password) {
    db.query(
      "SELECT * FROM membertbl WHERE memberid = ? AND password = ?",
      [userid, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          res.redirect("/home");
          res.end();
        } else {
          res.send(
            '<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>'
          );
        }
      }
    );
  } else {
    res.send(
      '<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>'
    );
    res.end();
  }
});

app.get("/home", function (request, response) {
  db.query(`SELECT * FROM productinfo`, function (error, products) {
    if (error) throw error; // 오류 처리
    response.render("home.ejs", { product: products, num: products.length });
  });
});

// 관리자 페이지
app.get("/admin", function (req, res) {
  db.query(`SELECT * FROM productinfo`, function (error, products) {
    if (error) throw error; // 오류 처리
    db.query(`SELECT * FROM suggestion`, function (error2, suggestions) {
      if (error2) throw error2;
      res.render("adminPage.ejs", {
        product: products,
        num: products.length,
        suggestion: suggestions,
        count: suggestions.length,
        moment: moment,
      });
    });
  });
});

app.get("/admin/manage", function (req, res) {
  db.query(`SELECT * FROM productinfo`, function (error, products) {
    if (error) throw error; // 오류 처리
    response.render("rentManage.ejs", {
      product: products,
      num: products.length,
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("app listening on port 3000");
});
