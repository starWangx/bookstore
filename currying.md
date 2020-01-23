柯里化（curring）的实际运用

特点：参数复用、提前返回和延迟执行。

1.实现 multi(2)(3)(4)=24？

闭包：
function multi(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        }
    }
}

缺点：
代码不够优雅，实现步骤需要一层一层的嵌套函数。
可扩展性差，假如是要实现 multi(2)(3)(4)...(n) 这样的功能，那就得嵌套 n 层函数。

函数柯里化：
函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。

提前返回和延迟执行：
var addEvent = (function() {
    if(window.addEventListener) {
        return function(el, type, fn, capture) {
            el.addEventListener(type, function(e) {
                fn.call(el, e);
            }, capture);
        }
    }else {
        return function(ele, type, fn) {
            el.attachEvent('on' + type, function(e) {
                fn.call(el, e);
            })
        }
    }
})()

 bind 函数的实现。使用了函数柯里化的两个特点：参数复用和提前返回。
 Function.prototype.bind = function (){
    var fn = this;
    var args = Array.prototype.slice.call(arguments); //let args = [...arguments]
    var context = args.shift();
    return function(){
        return fn.apply(context,args.concat(Array.prototype.slice.call(arguments)))
        //(Array.prototype.slice.call(arguments) 返回函数的arguments
    }
 }
 
 this.fn.bind(this,a,b,c)
 
 
 
 
 
currying的实现：

function multi() {
    var args = Array.prototype.slice.call(arguments);
	var fn = function() {
		var newArgs = args.concat(Array.prototype.slice.call(arguments));
        return multi.apply(this, newArgs);
    }
    fn.toString = function() {
        return args.reduce(function(a, b) {
            return a * b;
        })
    }
    return fn;
}

multi(2,3,4);