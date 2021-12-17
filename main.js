var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./lib/template.js'); // base.html 코드를 JS 객체로 만들어서 분리!
var path = require('path'); // 입력 정보 보안을 위해 가지고 옵니다.
var qs = require('querystring');
var express = require('express'); // express Node.js 위에서 동작하는 웹 프레임워크
var db = require('./lib/db.js'); // db 사용을 위한 설정
var product = require('./lib/productHTML.js'); // 물품 관련 html
var ejs = require('ejs');

var app = express() // applicationn 객체 반환
const router = express.Router();
app.set("view engine", "ejs");
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('express-session');
const { nextTick } = require('process');
  

app.use(express.static('public')); // public 폴더에 있는 static file 사용을 위해 추가
app.set('view engine', 'ejs')

 // 루트 경로로 접속 시 로그인 페이지로 이동
app.get("/", function (req, res) {
  res.render("login.ejs");
});

//로그인
app.post('/', function(req, res) {
  var userid = req.body.id;
  var password = req.body.pw;

  console.log(req.body.id);
  console.log(req.body.pw);
  if (userid && password) {
      db.query('SELECT * FROM membertbl WHERE memberid = ? AND password = ?', [userid, password], function(error, results, fields) {
          if (error) throw error;
          if (results.length > 0) {
              res.redirect('/home');
              res.end();
          } else {              
              res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
          }            
      });
  } else {        
      res.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
      res.end();
  }
});

// 홈 코드
app.get('/home', function(request, response){
	db.query(`SELECT * FROM productinfo`, function(error, products){
		if (error) throw error; // 오류 처리
		response.render('home.ejs', {product: products, num: products.length});
	});
});

 //대여 페이지
 app.post('/rent', function(req, res,next){
     var value = req.body.value;
     var datepicker = req.body.datepicker;
     var datas = [ value, datepicker];

    db.query(`SELECT * FROM productinfo`, function(error, products){
        console.log("productName");
		if (error) throw error; // 오류 처리
        req.on('end', function(){
            var post = qs.parse(body);
            db.query(`INSERT INTO rent (rentID, rent_date, rent_state, memberID, productNum) VALUES ("?",NOW(),"신청완료","20190958","101")`, 
            [post.datepicker],
            function(error2, rent){
                res.render('rent.ejs', {product: products, num: products.length});
        })
      
        })
	    // res.render('rent.ejs', {product: products, num: products.length});
    
    });
    // res.render("rent.ejs");
    // res.render('rent.ejs', {product: products, num: products.length});
    
 });  // 대여버튼 누르면 대여 페이지로 이동


 // productName 이름 가져오기

 app.get('/rent/:productName', function(req, res){
     var name = path.parse(req.params.productName).base;
     console.log(name);

    db.query(`SELECT * FROM productinfo`, function(error, products){
		if (error) throw error; // 오류 처리
		res.render('rent.ejs', {product: products, product_name: name});
        res.render(name);
       
	});
    // res.render("rent.ejs");
    
 });  // 대여버튼 누르면 대여 페이지로 이동



//예약 페이지

app.get('/reverse', function(req, res){

    res.render("reverse.ejs");
    
 });  // 예약버튼 누르면 예약 페이지로 이동


 app.get('/rent_check', function(req, res){
 
    res.render("rent_check.ejs");
    
 });  // 대여확인 누르면 대여 체크 페이지로 이동
 
 app.get('/reverse_check', function(req, res){
 
    res.render("reverse_check.ejs");
    
 });  // 예약확인 누르면 예약 체크 페이지로 이동
 

app.listen(3000, function(request, response){
	console.log('app listening on port 3000');
});