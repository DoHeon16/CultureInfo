 //express 기본 모듈 불러오기(express외장모듈->require을 통해 다운로드)
var express = require('express'), http = require('http');
//express 미들웨어 불러오기
var static = require('serve-static');
//express 객체 생성
var app = express();
//기본 속성 설정
app.set('port', process.env.PORT||8080);
app.set('host', '192.168.1.75');
//app.set('host', '172.16.164.12');
//static 서버 미들웨어 사용
app.use(static(__dirname));//현재 폴더에 대한 정적 접근 허용->이미 존재하는 파일 쓸거다
//express 서버 시작
http.createServer(app).listen(app.get("port"), app.get("host"), ()=>{
	console.log('Express serverrunning at '+app.get('port')+app.get('host'));
});

//ppt7 미리 만들어놓은 함수 use이용해서 미들웨어로 설정
// var myLogger = function (req,res,next){
// 	console.log('LOGGED');
// 	next();//use다음에 있는 함수 실행
// };
// app.use(myLogger);
// app.get('/',function(req,res){
// 	res.send('Hello World');
// });


//ppt9
// app.use('/',function(req,res,next){
// 	console.log('첫 번째 미들웨어에서 요청을 처리함.');

// 	res.user = "박유빈";
// 	next();
// });
// app.use('/',function(req,res,next){
// 	console.log('두 번째 미들웨어에서 요청을 처리함.');

// 	// res.writeHead('200', {'Content-Type':'text/html;charset = utf8'});
// 	// res.end('<h1>Express 서버에서 '+req.user+'가 응답한 결과입니다.</h1>');//이미 end해버리고 같은 요청에 대해서 요청 보낼 수 없어->에러뜸
// 	next();
// });
// app.use(function(req,res,next){
// 	console.log('세 번째 미들웨어에서 요청을 처리함.');

// 	res.send({name:'소녀시대',age:20});
// });


//0530 ppt14 루트주소만 입력했을 때도 접근할 수 있도록

var router = express.Router();
router.route('/').get(function(req, res){//루트로의 접근
	//res.redirect('/source/jquery.html');
	res.redirect('./source/main.html');//점을 붙여도 실행되고 안해도 실행됨 왜?
});
router.route('/routetest').get(function(req, res){
	res.redirect('http://google.co.kr');
});
router.route('/test').get(function(req, res){
	res.redirect('/source/lab/jquery.html');
});
//0611->
router.route('/rss').get(function(req,res){
	console.log("rss data requested");
	var feed = "http://rss.joins.com/sonagi/joins_sonagi_star_list.xml";
	http.get(feed, function(httpres){
		var rss_res = "";
		httpres.on('data',function(chunk){
			rss_res+=chunk;
		});
		httpres.on('end', function(){
			res.send(rss_res);
			console.log("rss response completed");
			res.end();
		})
	})
})
//<-0611
app.use('/', router);//이 미들웨어를 사용하겠다! router들은 use 함수보다 앞에 있어야해

app.all('*', function(req, res){//가장 나중에 있어야해
	res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>');
});

//WP-15


