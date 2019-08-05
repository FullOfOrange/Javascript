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
setTimeout(() => console.log('settimeout'))
//Stack에 최초에 쌓임
addFunc();
addFunc();
addFunc();
//다 끝난 이후에 MicroTask가 실행