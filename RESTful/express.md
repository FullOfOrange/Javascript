# Express

## - Function

```javascript
function add(x,y){
	return x+y;
}
```

```javascript
var add = function(x,y){
  return x+y;
}
```

```javascript
var add = new Function("x","y","return x+y;");
```

위와 같은 세가지 정의 방식이 있음. 두번째는 익명 함수로 변수에 할당되거나 특정 함수 내에서 1회성으로 실행될 때 유용. 런타임에서 함수가 정의된다고 함.

## - Callback Function

 ex) callback function의 원형

**fs.readFile(file[, options], callback)** 이런식으로 생겨먹었다. 여기에서 callback은 err와 data가 인자로 들어간다고 명시되어 있다. 여기에 맞는 인자를 넣으면 된다.

모든 Node 어플리케이션의 비동기식 함수에서는 첫번째 매개변수로는 error를, 마지막 매개변수로는 callback 함수를 받는다. 참고하자

---------------------------

function은 javascript에서 Object로 판단됨. Function = Object

여기에서 Callback function은 특정함수에 매개 변수로 전달된 함수를 말함. 그리고 callback function은, callback function을 전달받은 함수 안에서 호출된다. (A함수 안에 callback이 있다면, A가 실행 된 이후 바로 callback이 실행된다.)

이 경우에는 callback function이 실행 되던 말던 상관없이, 바로 다음 코드가 실행된다. callback은 부모 함수에 있던 작업이 다 종료되면, 함수를 호출한다.

``` javascript
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("Program has ended");
```

이 경우, 출력은 아래와 같다.

```console
Program has ended
Let's understand what is a callback function.
What the HELL is it?
```

이 방법은 non-Blocking Code로써, 작업을 기다리지 않고 계속 수행해서 Blocking Code보다 특정 기능에서 더 좋은 성능을 낼 수 있다.

## Express

### - Express Server

```js
var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})
```

3000 으로 listen 하는 서버를 만듦.

### - Routing

https://expressjs.com/ko/guide/routing.html따라서 이를 express.Router(); 가 리턴한 객체를 모듈로 리턴한 것이다. 

##### - 기본 구조

```javascript
app.METHOD(PATH, HANDLER)
```

기본 routing 구조임. METHOD에는 http 리퀘스트가 들어감. HANDLER에는 라우팅이 성공했을때, 실행되는 함수이다. 이것은, 외부 모듈을 넣어도 되고, Callback 함수로 req,res 를 인자로 넣고 사용해도 된다. 두개 이상의 콜백을 넣을꺼면, next를 인자로 넣어 사용해도 된다.

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

위의 예제가 next를 사용하여 콜백으로 다음 함수를 실행하는 것이다.

```javascript
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```

이것처럼 익명함수를 외부에서 선언 후에 내부에서 콜백 실행하는 익명함수와 겹쳐서 사용도 가능하다.

### - express.Router

위의 기본 구조 말고, 모듈식 마운트 가능한  핸들러 작성이 가능. 이것은 완전한 미들웨어이며 각각이 독립적 작동도 가능

```javascript
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
```

위와 같이 서술한 뒤 사용하면 된다.

> *미들웨어* 함수는 [요청 오브젝트](https://expressjs.com/ko/4x/api.html#req)(`req`), [응답 오브젝트](https://expressjs.com/ko/4x/api.html#res) (`res`), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수입니다. 그 다음의 미들웨어 함수는 일반적으로 `next`라는 이름의 변수로 표시됩니다.

이것을 보면 router.use 부분에서 next가 붙어있는 이유를 알 수 있음. use에서 다음 단계의 미들웨어 함수에 대한 엑세스 권한을 가지는 것임.

여기서 미들웨어는, Middle(중간 중간)의 목적에 맞게 처리를 하는, 거쳐가는 함수들임. next로 현재 미들웨어에 있는 요청을 넘겨줄 수 있음. (익명 함수가 없을땐 알아서 다음 것으로 넘기는 듯 / 각각의 함수들을 약간 절차지향의 느낌으로 넘기는 것을 next라고 표현하는 것으로 알고있을것임. post같은 경우에도 같은 라우팅 범주에 넣었을 때, )

굳이 next할 것이 없을땐, 쓰지 않고, res.send 로 response를 하고 종료한다.

## REPL Terminal Command

- **Ctrl+C** – 현재 명령어를 종료합니다.
- **Ctrl+C (2번)**  – Node REPL 을 종료합니다.
- **Ctrl+D** – Node REPL을 종료합니다.
- **위/아래 키** – 명령어 히스토리를 탐색하고 이전 명령어를 수정합니다.
- **Tab** – 현재 입력란에 쓴 값으로 시작하는 명령어 / 변수 목록을 확인합니다.
- **.help** – 모든 커맨드 목록을 확인합니다.
- .**break** – 멀티 라인 표현식 입력 도중 입력을 종료합니다.
- **.clear** – .break 와 같습니다.
- **.save filename** – 현재 Node REPL 세션을 파일로 저장합니다.
- **.load filename** – Node REPL 세션을 파일에서 불러옵니다.

## PM2 사용법

https://blog.outsider.ne.kr/1197 git 에 올라가서 출처를 알아놔야 할테지만 곧 문서화를 할 것임. 임시로 올려놓자.

## - 보안 유지

https://expressjs.com/ko/advanced/best-practice-security.html