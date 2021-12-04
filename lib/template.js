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
				<title>다있수룡</title>
				
				<style>
					a{
						text-decoration: none;
					}
					/*nav*/
					nav{
						position: fixed;
						z-index: 1;
						width: 100vw;
						font-size: 1vw;
					}
					.nav_box{
						background-color: #CABBE9;
						display: flex;
						justify-content: space-between;
						padding-left: 2vw;
						align-items: center;
					}
					.nav_logo{
						padding-top: 1vh;
					}
					.nav_logo > a{
						color: #FFCEF3;
						background-color: #FDFDFD;
						padding: 1vh;
						border-radius: 5%;
					}
					.nav_menu > ul{
						list-style: none;
						margin: 0;
					}
					.nav_menu > ul > li{
						display: inline;
						padding-right: 3vh;
					}
					.nav_menu > ul > li > a{
						text-decoration: none;
						color: #FDFDFD;
					}
					.nav_menu > ul > li > a:visited{
						color: #FDFDFD;
					}
					.nav_menu > ul > li > a:hover{
						color: #FFCEF3;
					}

					/*footer*/
					.footer_box{
						height: 20vh;
						margin: 0;
						font-size: 0.8vw;
						bottom: 0;
						background-color: #CABBE9;
						color: #FDFDFD;
						position: relative;
					}
					.footer_content_list{
						padding: 1vw;
						display: flex;
						justify-content: space-around;
					}
				</style>
			</head>
			<body>
				<nav>
					<div class="nav_box">
						<div class="nav_logo">
							<img src="img/logo.png" alt="수룡" width="50">
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
				<title>다있수룡</title>

				<style>
					/*가장 바깥쪽 div*/
					.paper{
						height: 95vh;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					/*로그인 폼을 감싸는 div*/
					.login_box{
						background-color: #FDFDFD;
						border: solid #EEEEEE;
						padding: 6vw 8vw;
						text-align: center;
						color: #CABBE9;
					}
					/*아이디 및 비밀번호 입력창*/
					.login_input{
						border: solid #CABBE9;
						width: 200px;
						height: 20px;
						padding: 5px;
					}
					.login_input:focus{
						outline: solid #FFCEF3;
					}
					/*로그인 버튼*/
					.login_btn{
						border: solid #CABBE9;
						border-radius: 5%;
						width: 215px;
						height: 40px;
						padding: 5px;
						background-color: #CABBE9;
						color:#FDFDFD;
						cursor: pointer;
					}
					/*링크를 감싸는 div*/
					.find{
						margin-top: 20px;
						display: flex;
						justify-content: space-around;
					}
					.find > a{
						text-decoration: none;
						color: #CABBE9;
					}
				</style>
			</head>
			<body>
				<div class="paper">
					<div class="login_box">
						<img src="img/daitsuryong.png" alt="다있수룡" width=200>
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