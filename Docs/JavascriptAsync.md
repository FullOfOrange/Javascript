# JavascriptAsync

### - CallBack

#### 값으로서의 함수와 콜백

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

### - Promise

#### MicroTask와 Stack 그리고 Promise Chaining

```javascript
let i = 0;
let promise = Promise.resolve();
//실행
function exe(){
    console.log(i++);
}
//Stack에 쌓여있는 addFunc을 다 해소하면서 promise.then()으로 MicroTask에 then에 붙은 콜백을 쌓아줌.
function addFunc(){
    promise = promise.then(() => {
        console.log('MicroTask Callback')
        exe()
    }) 
}
//Stack에 최초에 쌓임
addFunc();
addFunc();
addFunc();
//다 끝난 이후에 MicroTask가 실행
```

가장 간단하게 Promise와 Callback의 관계를 보여준다.  하단에 addFunc()가 실행된 건, Stack에 이미 모두 쌓여있고, 이를 해소하면서 promise.then으로 체인을 이어놓는다. 최후에 addFunc가 다 끝나면, 아래와 같은 Promise 체인이 생긴다.

```javascript
Promise.resolve().then(callback).then(callback).then(callback);
```

요런식으로 then 체인이 생기면서 Promise의 MicroTask에 Callback이 쌓이게된다. 여기서 콜백은 exe를 실행하는 것이다.

#### EventQueue와 MicroTask

```javascript
let i = 0;

setTimeout(() => {
    console.log('setTimeout', i++)
});
Promise.resolve().then(() => {
    console.log('promiseChaining', i++)
}).then(() => {
    console.log('promiseChaining', i++)
}).then(() => {
    console.log('promiseChaining', i++)
})
/* 결과
promiseChaining 0
promiseChaining 1
promiseChaining 2
setTimeout 3
*/
```

아무리 setTimeout이 먼저 실행되도 PromiseChaining에 있던 Task들이 Stack에 먼저 올라가는 것을 알 수 있다.

### - Async/Await

비동기 코드에서 Promise를 일반 동기로직처럼 사용할 수 있도록 만들어놓은 것으로, Generator 

```javascript
const getId = cb => {
  setTimeout(() => cb(1).1 )
}
```

##### day 6,8의 delay 비동기 코드화

Async / Await는 Promise를 일반적 코드에 녹여내기 위한 방법이다. try - catch마냥, await는 promise가 리턴되기까지 기다린다. 이 await를 적용이 가능한 함수는 async function이다.

```javascript
async function A(){
  await delay();
  console.log('fin delay.');
}
function B(){
  return new Promise((resolve, reject)=>{
  	setTimeout(() => resolve(), 2000)
  })
}
```

위와 같은 방식으로 코딩을 할 경우, A 함수가 delay를 기다리게 된다. 만약 A() 함수를 다른 함수에서 사용할 경우엔 throw를 스택으로 호출된 함수들에 리턴하는 것 마냥 A를 await로 기다리면 된다.

##### 일반적인 사용

```javascript
const A = (data) => new Promise(resolve =>
    setTimeout(() =>
        resolve(data.map((cur) => (cur.id)))
    ,1)
);
const B = (data) => new Promise(resolve =>
    setTimeout(() => 
        resolve(data.reduce((initVal,cur) => initVal + cur,0))
    ,1)
);
A(data).then(id => {
    B(id).then(name => {
        console.log(name);
    })
})
```

위의 코드가 id와 name이 포함된 데이터를 가지고 와서 id를 추출 한 뒤에, 그 아이디를 더하는 코드의 비동기 작동이다. 일단 then으로 할 수 있다.

```javascript
(async function(){
    let d = await A(data);
    console.log(await B(d));
})();
```

이런식으로 async를 이용하여 비동기를 풀어낼 수도 있다. 마치 이것은 일반적인 코드를 작성하듯 작성이 가능하여, 비교적 가독성이 좋을 수도 있다.