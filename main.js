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

var app = express(); // application 객체 반환

app.use(express.static("public")); // public 폴더에 있는 static file 사용을 위해 추가

app.set("view engine", "ejs");

app.get("/", function (request, response) {
  var html = template.loginHTML();
  response.send(html);
}); // 루트 경로로 접속 시 로그인 페이지로 이동

app.get("/home", function (request, response) {
  db.query(`SELECT * FROM productinfo`, function (error, products) {
    if (error) throw error; // 오류 처리
    var productList = product.list(products); // 대여 물품 정보
    var content = product.homeHTML(productList); // home.html에 대여 물품 정보 담기
    var html = template.baseHTML(content); // base.html에 home.html 붙이기
    response.send(html);
  });
}); // 로그인에 성공한 경우에만 홈으로 이동 가능!!

app.get("/admin", function (req, res) {
  res.render("adminPage.ejs");
});

app.listen(3000, function (request, response) {
  console.log("app listening on port 3000");
});
