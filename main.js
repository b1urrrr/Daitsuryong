var http = require('http');
var fs = require('fs');
var url = require('url');
var template = require('./lib/template.js'); // base.html 코드를 JS 객체로 만들어서 분리!
var templateLogin = require('./login/templateLogin.js'); // 로그인 관련 html 코드
var path = require('path'); // 입력 정보 보안을 위해 가지고 옵니다.
var qs = require('querystring');

var app = http.createServer(function (request, response){
	var _url = request.url;
	var queryData = url.parse(_url, true).query; // url에서 쿼리 스트링만 가져오기
	var pathname = url.parse(_url, true).pathname; // path에서 쿼리 스트링 제외
	var title = queryData.id; // 퀴리 스트링의 id만 가져오기
	
	if (pathname === '/'){ // 경로 이름이 '/'인 경우
		if(queryData.id === undefined){ // 첫 페이지는 로그인 페이지 입니다!
			var html = template.loginHTML();
			response.writeHead(200);
			response.end(html);
		}
	}else if (pathname === '/home'){ // 홈, base.html이 있고 사용자가 어떤 것을 눌렀는지에 따라 다른 것이 보여짐.
		fs.readFile('home/home.html', 'utf8', function(err, content){
			var html = template.baseHTML(content);
			response.writeHead(200);
			response.end(html);
		});
	}else if(pathname === '/suggestion'){
		fs.readFile('suggestion/suggestion.html', 'utf8', function(err, content){
			var html = template.baseHTML(content);
			response.writeHead(200);
			response.end(html);
		});
	}else{ // 경로가 없는 경우
		response.writeHead(404);
		response.end('Not Found!');
	}
});
app.listen(3000);