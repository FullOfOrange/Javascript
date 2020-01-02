# JS

### 기초

* var은, Functional Scope 로 들어간다. 어디에서 실행되던 자신의 바로 부모의 Scope로 들어감.
* const 와 let이 Block Scope 로 들어간다. 

#### - 객체

```js
var grades = {'egoing': 10, 'k8805': 6, 'sorialgi': 80};
```

```js
var grades = {};
var grades = new Object();
grades['egoing'] = 10;
grades['k8805'] = 6;
grades['sorialgi'] = 80;
```

key & value관계로 객체가 만들어진다. 값을 사용하는 방법은 아래와 같다.

```js
console.log(grades['egoing']);
```

for(key in values) 형태로, iterator 사용이 가능하다. 방법은 아래와 같다.

```js
var grades = {'egoing': 10, 'k8805': 6, 'sorialgi': 80};
for(key in grades) {
    document.write("key : "+key+" value : "+grades[key]+"<br />");
}
```

객체는 다른 것과 마찬가지로 타 객체와 함수를 담을 수 있다. Key - Value(Function, Object) 방식으로 값 대신 다른 것이 들어갈 수 있다는 것이다.

```js
var grades = {
    'list': {'egoing': 10, 'k8805': 6, 'sorialgi': 80},
    'show' : function(){
        for(var name in this.list){
            console.log(name);
        }
    }
};
grades.show();
```

표현 방식이 json 과 비슷하다. 다른 class 의 개념과 마찬가지로 생각해도 될 것 같다. 후에 객체지향 프로그래밍에서 진짜 class 가 나온다.

### Functional Programming

#### - 유효범위(변수)

```js
var vscope = 'global';
function fscope(){
  	var vscope = 'local';
    alert(vscope);
}
fscope();
```

함수 밖에서 선언한 변수는 전역변수이다. 함수 안에 선언한건 지역변수이다. 전역변수는 앵간하면 사용하지 말자.

불가피하게 전역 변수를 사용해야 한다면, 객체를 전역변수로 만들고, 객체 내의 속성으로 변수를 관리한다.

```js
MYAPP = {'a':{
    'first':1,
    'second':2
}};
MYAPP2 = {};
MYAPP2.a = {
    'first':3,
}
MYAPP2.a.second = 4;
console.log(MYAPP.a.first);
console.log(MYAPP.a.second);
console.log(MYAPP2.a.first);
console.log(MYAPP2.a.second);
```

(위와 같이 변수 할당이 가능하다.)

만약 아예 전역 자체를 쓰지 않고 싶으면 익명함수를 사용해서 써보자

```js
(function(){
    var MYAPP = {}
    MYAPP.a = null;
})
```

위와 같은 방식이 로직을 모듈화 하는 방법이라고 한다. (제대로 이해 못하겠으니 추후에 모듈화를 살펴보자.)

#### - 유효범휘(함수)

```js
for(var i = 0; i < 5; i++){
    var name = i;
}
console.log(name);
```

**{ }** 에 대한 유효범위는 다른 언어와는 다르게 함수에서만 지역변수가 허용된다. 여기에서는 for 밖에서 name에 접근이 가능할 뿐더러, 값도 변경이 가능하다. (for문은 함수 안에 없기에 결국 name 전역변수와 동일하다. 만약 함수 내에 있다면 name은 그 함수의 지역변수가 되었을 것이다.)

#### - 정적 유효범위

자바스크립트는, 함수가 **선언** 된 시점에서 유효범위를 가진다. (호출이 아니다.) 

```js
var k = 5;

function fa(){
    var k = 10;
    fb()
}
function fb(){
    console.log(k);
}
fa();
```

여기에서 결과는 5가 나온다. 당연한 결과지만, fb() 에서는 k를 호출했을시에, fa()의 지역변수가 아닌, 전역변수만 접근이 가능할 것이다.

#### - 변수 호이스팅(Hoisting)

변수의 정의가 그 범위에 따라 선언과 할당으로 분리되는 것. 변수가 함수 내에서 정의되면 선언이 함수의 최상위로, 바깥에서 정의하면 전역 컨텍스트의 최상위로 변경된다.

예를 들면 아래와 같다.

```javascript
function showName() {
     console.log("First Name : " + name);
     var name = "Ford";
     console.log("Last Name : " + name);
}
```

위와 같이 정의된 함수 내에서의 var name은 엔진이 아래와 같이 해석한다.

```javascript
function showName() {
     var name;
     console.log("First name : " + name);
     name = "Ford";
     console.log("Last Name : " + name);
}
```

이런식으로 선언부가 function (객체) 단위의 최상위로 올라간다.

이런것은 IIFE와 익명 함수에서는 global으로 선언부가 이동합니다. for 내의 변수도 마찬가지로 function의 개념이 적용되는 최상위로 이동한다.

```javascript
(function() {
  //'use strict'
  for(i=0; i<10; i++) {
    console.log('i', i)
  }
})()
console.log('after loop i is', i)
```

```javascript
var i
(function() {
  for(i=0; i<10; i++) {
    console.log('i', i)
  }
})()
console.log('after loop i is', i)
```

이런식으로 for는 상단의 익명함수에 종속적이고, 이 함수는 IIFE 이기에 i는 전역 객체로 이동된다. 이걸 막으려면

```
'use strict'
```

를 사용하여 막아놓는다. 위와 같은걸 function-scoped 라고 한다.

이런 것을 block-scoped 로 바꾸는 것이 let과 const이다. (블록 기준으로 hoisting을 진행하는 것) 이건 하단의 ES6에 써놓았다.

#### - 값으로서의 함수와 콜백

```js
function a(){console.log(4567)}
a(); //4567
a = {
    b: function(){
        console.log(1234);
    }
}
a.b();//1234
```

function a() {} 는 var a = function(){} 와 동일하다. 한마디로 a()는 변수와 동일하다. 따라서 아래에 a 를 객체로 재정의 한 뒤에 사용하면 a()는 호출이 안된다. 결국 a는 변수이다.

함수는 변수에 할당된 값이기에, 다른 함수의 인자로 전달도 가능하다.

```js
function cal(func, num){
    return func(num)
}
function increase(num){
    return num+1
}
function decrease(num){
    return num-1
}
console.log(cal(increase, 1));
console.log(cal(decrease, 1));
```

cal 에 변수로 func를 넣어놓았다. 이 함수에서 func에 필요한 함수를 넣어놓고, 같이 들어온 변수를 return해서 사용한다.(하단 코드펜스 내에 있는건 배열 형태로 값을 선언한 뒤에, 함수를 박는 것이다. 이처럼 배열에 함수를 박아넣는것도 가능하다.)

```js
function cal(mode){
    var funcs = {
        'plus' : function(left, right){return left + right},
        'minus' : function(left, right){return left - right}
    }
    return funcs[mode];
}
alert(cal('plus')(2,1));
alert(cal('minus')(2,1));
```

callback은 값의 처리를 다른 함수에게 넘겨주는 것이다. 아래의 코드는 callback의 예제를 위해 원형을 가져왔다. 함수는 다른 함수의 인자로 전달될 수 있기 때문에 아래와 같이 비교 함수를 변경해서 사용할 수 있다.

```js
arr.sort([compareFunction])
```

```js
function sortNumber(a,b){ return b-a; }
var numbers = [20, 10, 9,8,7,6,5,4,3,2,1];
alert(numbers.sort(sortNumber)); // array, [20,10,9,8,7,6,5,4,3,2,1]
```

#### - 클로저

https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures

함수는 다른 함수 내에 inner 로 정의될 수있고 (내부함수) 이는 outter 함수의 지역 변수에도 접근이 가능하다.

```js
function outter(){
    var num = 3;
    return function(){
        console.log(num);
    }
}
inner = outter();
inner();
```

위의 예제가 클로저이다. 내부의 익명함수를 리턴할 때, outter의 지역함수 까지 함께 변경되었다. 외부함수는, 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특징을 가진다.

```js
function A(name){
    var title = name;
    return {
        'get_title': function(){
            return title;
        },
        'set_title': function(_title){
            title = _title;
        }
    }
}
ghost = A('ghost');
avengers = A('avengers');
ghost.set_title('in the shell');
console.log(ghost.get_title());
```

이런식으로, 객체형태의 메소드로 사용이 가능하다. get 과 set을 이런식으로 규현이 가능하다. 

여기서 get과 set의 title은 동일한 변수를 가르키는게 맞다. (공유되는 것)

avengers와 ghost는 서로 독립된 객체이다.

console.log(ghost.title)로는 title을 접근하지 못한다. 무조건 get과 set으로만 title을 건드릴 수 있다. private 를 이런식으로 할 수 있다 (물론 typescript는 이런 문제가 없다.)

외부에 클로저 두개 파서 하는 예제도 있다. 참고하자. 먼저 

```js
var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(){
        return i;
    }
}
for(var index in arr) {
    console.log(arr[index]());
}
```

for문을 돌려서 그 상태의 i 값을 리턴 받으려고 클로저를 만들었다. (배열에 함수를 할당하고 그 함수는 i를 리턴하도록) 그러나 이 함수가 '호출' 되는 시점에서의 i는 (호출될 때 i를 가지고있는다.) 5이므로 5가 다섯번 출력 된다.

```js
var arr = []
for(var i = 0; i < 5; i++){
    arr[i] = function(id) {
        return function(){
            return id;
        }
    }(i);
}
for(var index in arr) {
    console.log(arr[index]());
}
```

즉시 실행 함수를 이용해서, id를 지역변수로 이용하여, 이 함수가 다른 함수를 이 지역변수를 이용하여 리턴되도록 만들었다. (말이 이상하다.)

당시의 i를 이용해서 각 배열 원소에서 가지고 있는 함수의 지역 변수를 정의시(즉시 실행 함수이니, 이를 정의하면서 바로 호출해버린다.)의 i로 초기화 해놓고, 이를 return 하는 것이다.

이 방법의 핵심은, 함수를 두개를 만들어서 (inner와 outter) outter의 지역 변수에 당시의 상태를 outter의 호출과 함께 넘겨주고, inner에서 그 변수를 활용하는 무언가를 만드는 것이다. 이 방법은 

```js
ghost = A('ghost');
```

위와 같이, 변수 하나에 함수를 하나 호출해서 객체처럼 사용하는 것과 동일하게 사용한다.

*변수에 함수를 '정의' 해버리면 그 당시의 값을 지역변수를 가지고 있는 것은 아닌 것 같다. '호출' 하며 실행될 때 주변의 지역변수를 가지고 온다.

#### - Arguments

arguments라는 배열은, arguments 객체의 인스턴스인데 이는 함수로 전달된 인자를 컨트롤 할 수 있는 객체이다. 

```js
arguments[0]
arguments.length;
for(var index of arguments){
	console.log(index);
}
```

위처럼 배열 형태로 사용 가능하다. 아래는 활용 예시이다.

```js
function sum(){
    var _sum = 0;
    for(var i = 0; i < arguments.length; i++)
        _sum += arguments[i];
    return _sum;
}
console.log(sum(1,2,3,4,5));
```

위는 함수의 인자가 정의된 개수와는 관계 없이 사용할 수 있는 것이다. 

```js
function sum(a,b){
    var _sum = 0;
    for(var i = 0; i < arguments.length; i++)
        _sum += arguments[i];
    console.log(a,b);//1 2
    console.log(sum.length);//2
    return _sum;
}
console.log(sum(1,2,3,4,5)); //15
```

이런식으로 함수의 length를 찍어보면 정의된 인자의 개수가 나오고, arguments의 length를 찍어보면 인자와 관계없이 넘겨받은 인자의 개수를 찍는다. 인자가 몇개 정의되어 있던 관계 없이 무제한으로 인자를 넣을 수 있고 이는 arguments 객체로 사용할 수 있다.

#### - 함수 호출

일반적인 함수 호출은 알고 있으니 apply와 call이 있다는 것을 인지하자.

apply는 아래와 같이 활용한다.

```javascript
function sum(arg1){
    var sum = 0;
    for(a of this){
        sum += a;
    }
    return sum+arg1;
}
console.log(sum.apply([1,2,3,4,5,6,7,8,9,10],123))
```

보는 것 처럼, 객체 형태로 넘기는 방법이다.(위에는 배열을 넘겼는데 결국 이것도 객체로 봐도 된다.) 함수를 객체 소속으로 만들어서 사용하게 하는 방법 같은 것이다. (this가 전역이 아니라 apply() 안에 넣은 것이 된다.)

```javascript
o1 = {val1:1, val2:2, val3:3}
o2 = {v1:10, v2:50, v3:100, v4:25}
function sum(){
    var _sum = 0;
    for(name in this){
        _sum += this[name];
    }
    return _sum;
}
alert(sum.apply(o1)) // 6
alert(sum.apply(o2)) // 185
```

이 예제가 각 객체에 sum 함수를 객체 소속으로 만들어서 사용하는 것이다. (각 함수의 인자는 또 따로 동작한다. 인자는 apply 사용시에 o1,123 이런식으로 사용한다.)

### OOP

javascript에선 function이 곧 객체이다. new로 '정의된 함수'를 객체를 할당하듯 생성하면 그것이 곧 객체인 것이다. function에는 인자도 들어갈 수 있으며, 그 인자는 this를 통해 관리된다. 직관적이되 관리가 어렵다. 

#### - 객체 생성 (with Constructor)

```javascript
function Person(name){
    this.name = name;
    this.introduce = function(){
        return 'My name is ' + this.name;
    }
}
var p1 = new Person('JHY');
console.log(p1.introduce());
```

위처럼, function으로 객체(여기선 class의 개념이다)를 지정하고, new를 사용해서 생성자와 함께 하나의 객체(여기선 Object)를 만들어낸다. 그리고 다른것은 마찬가지로 사용하면 된다.

단, Person은 function이기에 사용될 수도 있는데, 만약 사용한다면 this라는 것이 정의되어 있지 않기에 객체 생성을 하지 않고서는 사용이 불가하다. this라는 키워드는, 객체가 전달되지 않았을때엔, 전역객체를 의미한다. (global과 동일하다.)

##### class

간단한 클래스이다. 결국 함수인데 이걸 prototype 기반보다 쉽게 해놨다. 한번 보고 사용해보자

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes

#### - 전역 객체

nodejs 의 global, 웹에서의 window 이다. 전역객체는, 소스코드를 실행하는 최상위 객체이다. 모든 객체는 이 전역객체 아래의 자손으로 자리잡는다.

```javascript
var o = {'func':function(){
    alert('Hello?');
}}
o.func();
window.o.func();
```

이런식으로 window를 없애더라도, (global을 없애더라도) 사용이 가능하다.

#### - this

this는 호출 하는 대상에 따라서 달라지는, 함수 호출 context(맥락)이다. 객체와 함수 관계가 느슨한 javascript는 이것이 실질적인 연결점의 역할이다. 이것에 대한 정리는 추후에 bind와 화살표 함수와 곁들여 제대로 하자.

#### - Prototype

상속의 수단으로 사용되는 prototype은, 객체의 원형이라고 할 수 있다. 객체는 property를 가질 수 있는데, prototype이란 property는 그 용도가 정해져 있는 특수한 property이다. prototype에 저장된 속성들은 생성자를 통해서 타 객체가 만들어 질때 그 객체에 연결된다.

쉽게 설명하면, class라는 개념이 없기에(원래의 틀이 따로 없다), 기존의 객체를 복사하여 새로운 객체를 형성해야만 하고, 클래스  대신에 존재하는 원형이 바로 prototype이다. 자바스크립트는 이 prototype을 복사해서 사용한다. 먼저 함수와 객체의 내부 구조에 대해서 알아보자.

![](../Imgs/js_prototype.png)

*(사진이 변경되었다. 다시 내용 수정 요망)* 위와 같이, Person 함수를 만들면 prototype이라는 멤버를 가지게 되고, 이 속성은 다른 곳에 있는 함수 이름의 prototype 객체를 참조한다. 그리고 이 객체의 멤버인 constructor 속성은 원형의 함수를 참조하는 내부 구조를 가진다.

``` javascript
function Person(){}

var joon = new Person();  
var jisoo = new Person();

Person.prototype.getType = function (){  
    return "인간"; 
};

console.log(joon.getType());
console.log(jisoo.getType());
```

여기서 새로 생성한 객체는 Person 의 프로토타입 객체에 링크를 건다. 따라서 만약에 prototype 멤버가 동적으로 런타임에 추가되어도, 객체를 링크를 걸어놓으므로 객체들을 각각 수정할 필요가 없이 멤버 함수에 접근하여 사용이 가능해진다.

```javascript
function Person(){}

var joon = new Person();  
var jisoo = new Person();

Person.prototype.getType = function (){  
    return "인간"; 
};

joon.getType = function(){
  return "사람";
}
jisoo.name = '지수';
console.log(joon.getType());
console.log(jisoo.getType());
```

단 prototype이 아닌 각각의 객체에 멤버를 추가한다면, 이는 복사된 (jiso 라는 이름의) 객체에 추가되는 것이며, 이름이 동일할 경우에는 다른 언어들과 마찬가지로 오버라이딩 형태로 활용된다.

#### - Object

javascript는 값을 저장하는 기본 단위로 Object를 사용하고, 동시에 모든 javascript의 객체는 Object 객체를 상속받는다. 아래는 기본적인 객체의 생김세이다.

```javascript 
var grades = {'hello':10, 'hi': 8};
```

Object.keys() / Object.prototype.toString() 이 두가지 종류가 있는데 이 차이는 다음과 같다.

```
//Object.keys()
var arr = ["a","b","c"]
console.log('Object.keys(arr)', Object.keys(arr))
```

여기서 Object는 생성자 함수이다. 따라서 (생성자 함수).(함수) = function(){}의 형태로 되어있다는 느낌으로 보면 된다.

```
//Object.prototype.toString()
var o = new Object();
console.log('o.toString()',o.toString());
```

위와는 다르게, new Object()로 객체를 생성한 이후에 이 객체에서의 함수를 가져다 쓰는 것이다.

여기에서 Object는 

### ES6

#### let, const

var과는 다르게, block-scoped 로 hoisting을 한다. 한마디로 for 문 안에 넣으면, 이게 함수 전역으로 이동하는게 아니라 그 for문 내로 들어간다. (나중에 알아보자)

### 잡동사니

IIFE 즉시실행함수

```js
(function A(){
	console.log('hello');
})();
```

정의 즉시 바로 실행됨. 첫번째 괄호()  는 전역 스코프에 불필요한 변수를 추가해서 오염시키는 것을 방지하는 것/ 내부 변수에 접근 불가하도록. 두번째 괄호() 가 즉시 실행. 첫번째 괄호가 없으면 함수 제작이 불가능.

만약에 이 함수가 변수에 할당되면, return된 값만 저장한다. (할당 즉시 실행됨.)



ORM Sequelizer 프로그램이 종료되더라도 남아있는 특성? 같은 것 node에선 sequelizer 을 했다. 아무래도 RDB에 객체와 맵핑을 해놓는 과정이라고 생각한다.



for(var a in x) 와 for(var a of x) 를 구분하자. in은 value 이름을 가져오는거고(this[a] 같이 쓴다, of는 this에서 값을 다 할당시켜버리는 foreach 같은거고.



var은 function-scoped, let, const는 block-scoped이다.

### JS 문법 정리

### - function* / yield

http://jeonghwan-kim.github.io/2016/12/15/coroutine.html

위의 Promise의 async, await 예제를 조금더 풀어서 제너레이터를 적용해보자.

```javascript
function* gen(){
    let id = yield A(data);
    let result = yield B(id);
    console.log(result);
}
const g = gen();
g.next().value.then(id =>
    g.next(id).value.then(result =>
        g.next(result)));
```

이런식으로 하면 generator function을 이용할 수 있다.

generator function 안에 있는 함수는, next()가 호출될 때마다, yield에 **{value: return 값, done: true/false}** 형태로 리턴을 해준다. (yield 키워드를 만날때, 멈춘다음,  gen.next() 의 호출 결과로 위의 객체를 리턴해주는 것이다.

최초의 next()에는 해결되지 않은 promise가 넘어온다. (value,done 이 동시에 넘어온다.) 이것에서 value를 꺼낸 뒤, then으로 promise를 풀어준다. 그렇다면, promise에서 넘겨준, resolve 값을 받을 수 있는데 이것을 gen.next() 를 호출하며 인자로 넣어준다. 그럼 다시 gen함수의 yield로 인자가 들어가며, id에 값이 들어간다. 이과정의 반복. 위와같이 수동으로 이것들을 해결해줄 수 있다.

main과 gen() 과의 호출권을 넘겨주는 과정이며 마치 핑퐁마냥 작동한다.

```bash
next(main) → promise(gen) → yield(gen) → then(main) →  // id 획득
next(main) → promise(gen) → yield(gen) → then(main) → // name 획득
console.log(gen)
```

위와 같은 과정으로 살펴보아도 좋을 것이다.

위의 수동으로 풀어준 과정을 외부의 모듈을 이용하여 구현할 수도 있다. 이것을 코루틴이라고 말한다.

###- tj/co

```js
const co = require('co')

co(function* gen () {
  const id = yield getId();
  const name = yield getNameById(id);
  return {id, name};
}).then(user => console.log(user));
```

##### bluebird.coroutine

```js
const Promise = require('bluebird')

Promise.coroutine(function* gen () {
  const id = yield getId();
  const name = yield getNameById(id);
  return {id, name};
})().then(user => console.log(user));
```

### - mutable, immutable

https://poiemaweb.com/js-immutability

불변성과 가변성. 모든 자바스크립트의 원시타입은 불변성을 가지며, 만약 새로운 것을 할당한다면, 변수가 가르키는 주소가 변경되는 방법이고, 이전의 객체는 존재는 하나 가르키는 것이 없는 '쓰레기 값'이 된다. 이것은 GC가 수거하고.

객체는 그렇지 않다. 모두 그 주소의 원본을 수정한다. (원본이 원시타입이면 그건 또 불변성을 가진다.)

사실 명확한 이해는 안되지만, 기존의 주소에 있는 데이터가 변경된다면, 이것은 가변성이고, 기존의 주소가 가르키는 원본 데이터를 가르키는 것이 사라지고 새로운 데이터가 만들어진다면, 이것은 새로운 데이터이다.

### - exports & require

- exports 는 전역객체이다.간단하게 말하면 그냥 exports라는 전역객체에 특정 속성, 변수, 메소드를 넣어버리는 것이다. 따라서 파일 내에서 exports를 많이 사용해서 여러가지 속성이나 메소드를 넣어버릴 수도 있다. (객체 여러개를 동시에 리턴한다고 봐도 된다.) 

- module.exports는 객체 하나에 여러가지 속성을 넣어서 리턴하는 것이다. {}안에 각종 메소드와 변수를 객체 형태로 넣은 뒤 이것들을 사용하면 된다. module export와 exports는 동일한 객체를 리턴한다. 이 둘은 사실은 동일한 것이며, module.exports가 exports 를 바라보고 있는 형태이다. (레퍼런스가 동일하다고 보면 된다.) 따라서 이 둘은 exports에 객체를 만들어서 보내버리는 것이다. 

- require은 이 exports에 넣어놓은 객체를 변수에 할당하는 것이다. 마치 객체를 정의하여 변수에 할당하듯 정의를 하면 된다. (실제로 exports에 객체형태로 저장해놓은 것을 꺼내와서 변수에 할당하는 과정이다.) require에는 경로를 지정할 수 있다. 그러나 경로에 .js와 directory 명이 동일하지만, 파일명을 명시하지 않았다면, .js를 우선적으로 찾는다. directory 전체를  require로 포함시킬 수도 있다. 그러나 이것은 module 정책에 따라 특정 정의된 것만 include된다. (기본으로 디렉토리를 require 할때 가져오는 것은 directory 내부의 index.js이다.)

- require는 넘어온 객체 내의 일부 객체만 받아서 쓸  수도 있다. require('lodash/every') 이런식으로 사용할 수도 있다.

- import 는 typeScript 에서 많이 사용되는 것이다.. 이건 babel? 로 설정을 해서 사용할 수도 있다. 바벨은, 특정 코드의 컨벤션과 규약을 아래 버전으로 내려주는 것이다.

- module.exports 와 exports는 결국 최종적으로는 module.exports가 리턴된다. exports가 module.exports를 바라보는 형태이다(call by reference로 동일한 객체를 호출하는 느낌) 

  ```javascript
  var express = require('express');
  var router = express.Router();
  
  /* GET home page. */
  router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });
  
  module.exports = router;
  ```

  따라서 이를 express.Router(); 가 리턴한 객체를 모듈로 리턴한 것이다. 

## 그 외

### - eval(name)

이게 동일한 변수명을 찾아서 실행해주는 것이다.

### - * Best Practice

(*은 wild 카드이다.) 검색할 때 이런 키워드를 사용하면 좋은 예시가 많이 나온다.

#### - Underscore (_) 변수는, 최근에 지칭했었던 '결과값' 을 가짐.

```javascript
var x = 10;
var y = 5;
x + y;
var sum = _
console.log(sum)
15
```

위와 같이, sum 을 출력하면 15가 출력된다.

#### - 왜??

왜 에 대해 탐구하자. 어떤것이 왜 생겼나 찾아보면 사용처를 알수 있다.

#### - Observer Pattern

나중에 기억 안날때를 대비하여… 안드로이드 프로그래밍을 할때, 이벤트를 발생시켜서 다른 엑티비티와 통신하는 방법이 이거였다..

http://blog.naver.com/PostView.nhn?blogId=c_ist82&logNo=220795909036&parentCategoryNo=&categoryNo=9&viewDate=&isShowPopularPosts=false&from=postView

여기 정말 잘 나와있다. 참고하자.

#### - MVC

https://opentutorials.org/course/697/3828

**Model - View - Controller** 의 형태로 이뤄진 모델. 컨트롤러에 의해 사용자와 소통하고, View를 통해 UI등의 그래픽을 수정하며, Model 을 통해 상호 소통한다. 이들을 분리해놓고 사용하는 방식.  이 패턴은 여러 파일에 나누어 적용한 뒤에, 객체들을 통해 소통할 수 있으며, 상호간의 연결성을 최소화 하기 위해서, Observer 패턴을 적용할 수도 있다.