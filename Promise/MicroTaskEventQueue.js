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