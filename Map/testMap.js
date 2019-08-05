//사실 Map 이라는 자료구조가 존재한다..... 그걸 쓰자.

let Map = [];
/**
 * Key,Value 구조 Add함수
 * @param {*} key 
 * @param {*} value 
 */
function addMap(key,value){ Map[key] = value; }
/**
 * Key를 기준으로 삭제
 * @param {*} key 
 */
function deleteMap(key){ delete Map[key]; }

function getMap(key){ return Map[key]; }

addMap(123,'string123');
addMap(124,'string124');
deleteMap(123);
console.table(getMap(124));