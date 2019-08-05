# TDD

## Jest

Unit단위 테스트 툴. 페이스북에서 만든건데 Snapshot기능이 요긴하게 쓰인다고 한ㄷ.

https://medium.com/@jinseok.choi/jest를-이용한-unit-test-적용기-420049c16cc8

https://jestjs.io

테스트를 할땐, 먼저 스토리 라인을 짜놓고 해야한다. 그래야 잘 만들 수 있음.

#### 시작하기

https://jestjs.io/docs/en/getting-started

간단하게 설정해야 할 것들이 있다. npm으로 run test 를 실행하면, jest가 실행되도록 package.json에서 scripts를 추가해줘야한다.

```javascript
"scripts": {
    "test": "jest"
},
//npn run test
```

파일명은, **(TEST_SOURCE).test.js** 로 한다. 그러면 알아서 테스팅을 해주는 것 같다.

```javascript
/*sum.js*/
function sum(a, b) {
    return a + b;
}
module.exports = sum;
```

```javascript
/*sum.test.js*/
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

위와 같이 해놓고 테스팅을 하면 된다. 

```javascript
PASS  TDD/source.test.js
✓ adds 1 + 2 to equal 3 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.962s
Ran all test suites.
```

그렇게 되면 이런 결과를 내뿜는다. 이렇게 테스팅을 실행하자!

#### 비동기 테스트

https://jestjs.io/docs/en/asynchronous

여기서 정리해서 사용하자. 솔직히 너무 많아서 힘들다 ㅋㅋㅋ

