var template = {
	baseHTML: function (content){
		return `
			<!DOCTYPE html>
			<html lang="ko">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<!-- CSS only -->
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
				<!-- JavaScript Bundle with Popper -->
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
				<link rel="stylesheet" href="/css/base.css">
				<link rel="stylesheet" href="/css/home.css">
				<title>다있수룡</title>
			</head>
			<body>
				<nav>
					<div class="nav_box">
						<div class="nav_logo">
							<img src="/img/logo.png" alt="수룡" width="50">
							<a href=""><strong>다있수룡</strong></a>
						</div>

						<div class="nav_menu">
							<ul>
								<li><a href="">마이페이지</a></li>
								<li><a href="">관리자 페이지</a></li>
								<li>안녕하세요! {사용자}님</li>
								<li><a href="/">로그아웃</a></li>
							</ul>
						</div>
					</div>
				</nav>

				<div class="container" style="padding-top: 90px; padding-bottom: 90px;">
					${content}
				</div>

				<footer>
					<div class="footer_box">
						<div class="footer_content_list">
							<div>
								<p>
									이름: 전채연<br>
									학번: 20190993<br>
									학과: 컴퓨터공학과<br>
									직책: 팀장
								</p>
							</div>
							<div>
								<p>
									이름: 김영은<br>
									학번: 20170669<br>
									학과: 심리학과<br>
									직책: 팀원
								</p>
							</div>
							<div>
								<p>
									이름: 김민선<br>
									학번: 20182293<br>
									학과: 컴퓨터공학과<br>
									직책: 팀원
								</p>
							</div>
							<div>
								<p>
									이름: 김수빈<br>
									학번: 20190958<br>
									학과: 컴퓨터공학과<br>
									직책: 팀원
								</p>
							</div>
						</div>
						<p style="text-align: center;">© SSWU 2021-2 데이터베이스 프로그래밍 12팀</p>
					</div>
				</footer>
			</body>
			</html>
		`;
	},
    loginHTML: function(){
		return `
			<!DOCTYPE html>
			<html lang="ko">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link rel="stylesheet" href="/css/login.css">
				<title>다있수룡</title>
			</head>
			<body>
				<div class="paper">
					<div class="login_box">
						<img src="/img/logo.png" alt="다있수룡" width=200>
						<h1>Login</h1>
						<form action="" method="POST">
							<p><input class="login_input" type="text" placeholder="ID"></p>
							<p><input class="login_input" type="password" placeholder="Password"></p>
							<button class="login_btn"type="submit"><b>로그인</b></button>

							<div class="find">
								<a href="">이용 안내</a>
								<a href="">비밀번호 찾기</a>
								<a href="/home">홈</a>
							</div>
						</form>
					</div>
				</div>
			</body>
			</html>
		`;
	}
}

module.exports = template;