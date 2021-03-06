### JS 흔한 질문들

1. 브라우저의 렌더링 동작과정을 짧게 설명해보세요.

2. Object.create의 역할은 무엇인가요?

   새로운 객체를 만드는 것. 단 new 와 다른 점은

3. 자바스크립트에서 모듈내의 private한 속성을 만드는 방법을 아는대로 쓰세요.

    Closure 를 이용해서 만듦. 객체 내에 변수를 지정하고,  이것을 리턴해주는 다른 함수를 만들어서  객체를 날려버림.  그렇게되면  Private한 속성을 만들수 있음. 또는 module 이니, 특정 변수나 함수를 export하지 않으면 됨.

4. JS에서 재귀호출로 인한 stack overflow를 막을 수 있는방법은?

   트램폴리닝 => 함수의 결과가 아닌 함수를 반환시켜서 그것을 드라이버 함수가  실행시키는  것.  최초에  꼬리를 물듯이  이어지는 재귀호출  함수의 return 을 함수형태로 바꿔주고, 그것을 제너레이터의 yield로 반환을 해줌. 그렇게 되면 그 당시의 상태로 (변수 입력에 다음 함수의 yield가 들어있는 형태로) 저장되게 되는데 이것을 배열에 쌓아놓고 마지막에  다 해버리면 좋을 듯....

5. closure 와 스코프관계를 설명해보세요.

6. 본인이 경험한 OOP관점에서의 객체분리를 설명하고, 느낀 장점을 말해보세요.

7. == 보다, === 를 써야할때는?

   == 는 타입 검사를 따로 안해줌. 예를 들면 0 과 '0' 이 같은 값이라고 알려줌. 이는 엄연히 number와 string으로 다르지만. 하지만 ===는 0 과 '0' 이 다르다고 해줌. 이런식으로 약타입에서의 허용을 막아줄 필요가 있을 때 === 을 사용함

8. DFS, BFS를 통한 트리탐색방법 중 본인이 경험(사용)했던 방식은 무엇이고, 동작원리를 짧게 설명해보세요.

   DFS를 사용해봄. 재귀호출을 통해서 하나씩 탐색을 해봄.... 아 이건 어떤식으로 구현이 최초에 이뤄져있었는지를 미리 정의해놓고 생각을 해보면좋을 듯

9. ES6의 Class extends 내부 동작원리에 대해서 설명해보세요.

   js는 Prototype 언어임. 따라서 이건 prototype을 편하게 쓰기 위해 만들어진 방식으로, prototype을 통해 만들어지는데,   최초에 있던 A라는 객체에서 prototype을 가져온 뒤에 그것에 B라는 prototype을 붙여서 만드는 방식

   ```ts
   //이곳에 prototype 만드는 예제를 넣어놓기.
   ```

10. 객체를 탐색하는 방법에 대해서 2가지를 작성해보세요.

    for in 과 for of 가 있음. in 은 value 를 하나씩 도는거고 of는 key의 값을 하나씩 순회하는 것임.

11. NodeList 타입을, Array에 있는 reduce메서드를 사용하는 방법은?

12. arrow 함수의 this가 결정되는 방식을 설명해보세요.

    

13. immutable과 mutable은 무엇이 다른것인가요?

    immutable은 불변하는 값임. 예를 들어 변수가 하나 있으면, 그 변수에 새로운 값을 대체할 수가 없는 것. mutable은 변수에 새로운 값을 할당해서 같은 주소에서 다른 값으로 변화할 수 있는것임. 따라서 immutable은 특정 주소에 있는 값이 불변한다는 것이고, mutable은 특정 주소에서의 값이 변경될 수 있다는 것임.

14. undefined와 null의 차이점을 설명하세요.

    null은 또다른 객체임. null이라는 타입을 가진 객체를 만들어서 그것을 할당하는 것. undefined 는 아직 값이 할당되지 않은 것임. 

15. 아래처럼 동작하는 flatten함수를 reduce를 활용해서 만들어보세요.

```javascript
  const arr = [[1, 2], [3, 4], [5, 6]];
    const flattenedArray = flatten(arr);
    console.log(flattenedArray)  //[1, 2, 3, 4, 5, 6];
코드복사
```

1. 객체를 복사해서 새로운 객체를 만들고 싶습니다. 코드를 구현해보세요. (객체의 깊이는 1단계만 있다고 가정)
2. Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요.
3. 프로그래밍 요구사항을 받았을때, 구현하기 전까지 어떤 과정을 거치시나요?
4. prototype 의 동작방식에 대해서 설명해보세요.
5. 순환되는 캐로셀UI의 구현 원리에 대해서 설명해보세요.
6. Event 객체에 대해서 설명해보세요.
7. 웹사이트의 초기 로딩속도를 더 빠르게 하기 위해서 무엇을 해야 할까요?
8. 최근 가장 깊게 공부하고 있는 부분은 무엇인가요? 그 부분에 대해서 간단하게 설명해보세요.
9. Array.from 이 모든 브라우저에서 동작하도록 polyfill코드를 만들어보세요.
10. 브라우저의 렌더링 동작과정을 짧게 설명해보세요.
11. arrow 함수의 this가 결정되는 방식을 설명해보세요.
12. 비동기의 장점을 설명해보세요.
13. 본인이 즐겨하는 디버깅 방법을 설명해보세요.
14. bind 가 필요한 상황을 간단한 코드로 보여주세요.
15. CommonJS 스펙에 대해 설명해보세요.
16. node의 middleware의 동작방식을 설명해보세요.
17. 본인이 생각하는 좋은 객체지향프로그래밍에 대해서 설명해보세요.
18. 클로저로 동작되는 상황을 예시코드로 보여주세요.
19. React의 virtual DOM 은 뭐에요?
20. React의 렌더링 방식은 무엇인가요?
21. React의 초기화면 느린 부분은 어떻게 해결해야해요?
22. SSR은 무엇인가요? 어떻게 구현하죠?