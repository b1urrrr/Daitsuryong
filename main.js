var express = require('express'); // express Node.js 위에서 동작하는 웹 프레임워크
var db = require('./lib/db.js'); // db 사용을 위한 설정
var ejs = require('ejs'); // ejs 사용
var moment = require('moment'); // 날짜 출력 포맷, 설치 필요
const router = express.Router();
const bodyParser = require("body-parser");
var session = require('express-session');
const { O_NOFOLLOW } = require('constants');
const multer = require('multer'); // 이미지 업로드를 위한 모듈
const path = require('path');
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var app = express() // applicationn 객체 반환

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/img/'); // public/img 폴더에 이미지 저장
  },
  filename: function(req, file, cb){
    const ext = path.extname(file.originalname); // 파일 확장자
    cb(null, path.basename(file.originalname, ext)+ "-" + Date.now() + ext); // 파일을 추가한 날짜를 포함해 파일명 작성
  },
});

var upload = multer({storage: storage});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // public 폴더에 있는 static file 사용을 위해 추가
app.set('view engine', 'ejs')


 // 루트 경로로 접속 시 로그인 페이지로 이동
app.get("/", function (req, res) {
    res.render("login.ejs");
});

var user = ''; // 로그인한 사용자의 아이디를 저장

//로그인
app.post("/", function (req, res) {
    var userid = req.body.id;
    var password = req.body.pw;
    // console.log(req.body.id);
    // console.log(req.body.pw);
    if (userid && password) {
        db.query('SELECT * FROM membertbl WHERE memberid = ? AND password = ?', [userid, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.redirect('/home');
                user = userid; // 로그인에 성공한 user id 담기
                res.end();
            } else {              
                res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/";</script>');    
            }            
        });
    } else {        
        res.send('<script type="tegxt/javascript">alert("username과 password를 입력하세요!"); document.location.href="/";</script>');    
        res.end();
  }
});

// 홈 코드
app.get('/home', function(request, response){
	db.query(`SELECT * FROM info`, function(error, products){
		if (error) throw error; // 오류 처리
		response.render('home.ejs', {product: products, num: products.length});
	});
});

// productName(대여 물품 이름), productCode(대여 물품 종류) 가져오기
app.get('/rent/:name/:code', function(req, res){
    var productName = req.params.name; // 전달 받은 대여 물품 이름
    var productCode = req.params.code; // 전달 받은 대여 물품 종류
    var date_current = Date.now()

    res.render('rent.ejs', {product_name: productName, product_code: productCode, date: date_current, moment: moment})
});  // 대여버튼 누르면 대여 프로세스 작동

//대여
app.post('/rent', function(req, res, next){
    var productCode = req.body.productCode; // 대여할 물품 종류를 나타내는 코드

    db.beginTransaction(function(err){
        if (err) next(err);
        db.query(`
            SELECT productNum, product.productCode, productName, productImg FROM product JOIN productInfo ON product.productCode = productInfo.productCode WHERE productStatus=1 AND product.productCode=?;`, 
            [productCode], function(err1, product){
            if (err1) next(err); 
            var num = product[0].productNum; // 현재 대여 가능한 물품 번호 가져오기
            var img = product[0].productImg; // 물품 이미지 경로
            var name= product[0].productName; // 물품 이름

            db.query('UPDATE product SET productStatus=0 where productNum=?', [num], function(err2){ // product 테이블 업데이트 
                if (err2){
                    return db.rollback(function(){
                        next(err);
                    });
                } // 업데이트 오류

                db.query('INSERT INTO rent VALUE(null, now(), "신청완료", ?, ?, ?)', [user, productCode, num], function(err3, result){ // rent 테이블에 삽입
                    if (err3){
                            return db.rollback(function(){
                                next(err);
                            });
                    } // 삽입 오류

                    db.commit(function(err4){
                        if(err4){
                            return db.rollback(function(){
                                next(err);
                            });
                        }
                        console.log('success!');
                        // 일단 대여가 완료되면 rent_check로 이동!
                        res.render('rent_check.ejs', {rent_id: result.insertId, rent_product: name, rent_img: img, rent_date: Date.now(), moment: moment});
                    });
                }); // rent 테이블에 데이터 추가
            }); // product 테이블 업데이트
        }); // 물품 정보 가져오는 SQL
    }); // transaction 사용하기
});

// productName(예약 물품 이름), productCode(예약 물품 종류) 가져오기
app.get('/reserve/:name/:code', function(req, res, next){
    var productName = req.params.name; // 전달 받은 예약 물품 이름
    var productCode = req.params.code; // 전달 받은 예약 물품 종류
    var date_current = Date.now()
    
    db.query('SELECT * FROM reservation where productCode=?', [productCode], function(err, reservation){
        if(err) next(err);
        res.render("reserve.ejs", {product_name: productName, product_code: productCode, date: date_current, moment: moment, counts: reservation.length});
    });
}); // 예약버튼 누르면 예약 프로세스 동작

// 예약
app.post('/reserve', function(req, res, next){
    var productCode = req.body.productCode; // 예약할 물품 종류를 나타내는 코드

    db.query('SELECT * FROM productInfo WHERE productCode=?', [productCode], function(err, product){
        if(err) next(err);
        var name = product[0].productName; // 예약한 물품 이름
        var img = product[0].productImg; // 예약한 물품 이미지

        db.query('INSERT INTO reservation VALUE(null, ?, ?)', [user, productCode], function(err2, result){
            if(err2) next(err2);
            res.render("reserve_check.ejs", {reservation_id: result.insertId, reservation_name: name, reservation_img: img});
        });
    });
});

// 예약 취소
app.post('/reserve_cancel', function(req, res, next){
    var delete_key = req.body.key;
    db.query('DELETE FROM reservation WHERE reservationID=?', [delete_key], function(err){
        if(err) next(err);
    });
    res.redirect('/home');
});

// 마이페이지
app.get('/mypage', function(request, response){
    db.query(`SELECT * FROM rent INNER JOIN productInfo ON rent.productCode = productInfo.productCode WHERE memberID = ?`,[user], function(error, rent){
		if(error) throw error;

        db.query(`SELECT * FROM reservation WHERE memberID = ?`, [user], function(error2, reservation){
        if(error2) throw error2;
        response.render('mypage.ejs', {user: user, rent: rent, reservation: reservation, moment: moment});
        });
	});
})

//건의사항
app.get("/suggestion", function (req, res) {
    res.render("suggestion.ejs");
});

app.post('/suggestion', function(req, res) {
    console.log(req.body);
    db.query('INSERT INTO suggestion SET ? ', {content: req.body.text, create_date: new Date(), memberID: user }, function(err, results, fields){ 
        if (err) throw err;
        console.log(results);
        res.redirect('/home')
    });
}); 

// 물품 추가, 일단 DB에 이미지 저장하려고 만들었음.
app.get("/addProduct", function(req, res){
    res.render('createProduct.ejs');
});

app.post("/addProduct", upload.single('img'), function(req, res, next){
    let productNum = req.body.productNum;
    let productName = req.body.productName;
    let productStatus = 1; // 처음에는 무조건 물품 상태를 1로 설정...
    let img = `/img/${req.file.filename}`; // 이미지 경로
  
    db.query('INSERT INTO product VALUES (?, ?, ?, ?)', [productNum, productName, productStatus, img], function(err, result){
        if(err){
            throw err;
        }
        res.redirect('/home');
    });
});

// 관리자 페이지
app.get("/admin", function (req, res) {
     db.query(`SELECT * FROM info`, function (error, products) {
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
    db.query(`SELECT * FROM info`, function (error, products) {
        if (error) throw error; // 오류 처리
        res.render("rentManage.ejs", {
            product: products,
            num: products.length,
        });
    });
});

app.use(function(req, res, next){
	res.status(404).send('Sorry can not found that!');
}); // 404 오류 처리

app.use(function (err, req, res, next){
	console.error(err.stack)
	res.status(500).send('Something broke!')
}); // Error-handling middleware...

app.listen(3000, function (request, response) {
    console.log("app listening on port 3000");
});
