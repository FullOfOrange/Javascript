let data = [
  {
    id: 1,
    name: "kim"
  },
  {
    id: 2,
    name: "lee"
  },
  {
    id: 3,
    name: "park"
  },
  {
    id: 4,
    name: "choi"
  }
];
const A = data =>
  new Promise(resolve => setTimeout(() => resolve(data.map(cur => cur.id)), 1));
const B = data =>
  new Promise(resolve =>
    setTimeout(
      () => resolve(data.reduce((initVal, cur) => initVal + cur, 0)),
      1
    )
  );
/*
A(data).then(id => {
    B(id).then(name => {
        console.log(name);
    })
})
*/
/*
(async function(){
    let d = await A(data);
    console.log(await B(d));
})();
*/
function* gen() {
  let id = yield A(data);
  let result = yield B(id);
  console.log(result);
}
const g = gen();
g.next().value.then(id => g.next(id).value.then(result => g.next(result)));
