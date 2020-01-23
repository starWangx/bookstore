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

var a = multi(1, 2, 3);
var b  = multi(1, 2, 3)(1)(2) ;
console.log(a);
console.log(b);