调用方法,用一个对象替换掉另一个对象(this)


对象.call(新this对象,实参1,实参2,实参3.....)
对象.apply(新this对象,[实参1,实参2,实参3.....])


1.间接调用函数,改变作用域的this值

2.劫持其他对象的方法
var foo = {
  name:"张三",
  logName:function(){
    console.log(this.name);
  }
}
var bar={
  name:"李四"
};
foo.logName.call(bar);//李四
实质是call改变了foo的this指向为bar,并调用该函数

3.两个函数实现继承
function Animal(name){   
  this.name = name;   
  this.showName = function(){   
    console.log(this.name);   
  }   
}   
function Cat(name){  
  Animal.call(this, name);  
}    
var cat = new Cat("Black Cat");   
cat.showName(); //Black Cat

4.为类数组(arguments和nodeList)添加数组方法push,pop

(function(){
  Array.prototype.push.call(arguments,'王五');
  console.log(arguments);//['张三','李四','王五']
})('张三','李四')

5.合并数组

let arr1=[1,2,3]; 
let arr2=[4,5,6]; 
Array.prototype.push.apply(arr1,arr2); //将arr2合并到了arr1中

6.求数组最大值
Math.max.apply(null,arr)

7.判断字符类型
Object.prototype.toString.call({})