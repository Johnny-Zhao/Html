/*
  1.this 永远指向函数运行时所在的对象，而不是函数创建时所在的对象
  2.匿名函数和不处于任何对象中的函数，this指向window
  3.call, apply, with指的this是谁就是谁
  4.普通函数调用，函数被谁调用，this就指向谁
  5.构造函数，通过这个函数生成一个新对象（object），这时候的 this 就会指向这个新对象；如果不使用 new 调用，则和普通函数一样。
*/

var item = 10;
// 立即执行函数，不污染全局空间
var game = (function(){
  // game属于window下的对象
  var item = 5;

  // 函数表达式
  var get = function(){
    console.log(this.item); // 此时的this指向window  2.10   4.undefined
    return this.item;
  }

  var test = function(){
    console.log(this.item); // 第一次返回return里面的对象  1.undefined
    var finalResult = get();
    console.info(finalResult); // 3.10
  }

  return{
    get:get,
    test:test
  }
})()

game.test();
game.get();