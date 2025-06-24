// ****************************************
//              Closure
// ****************************************

// Closure is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.
// We see two definitional characteristics here. First, closure is part of the nature of a function. Objects don't get closures, functions do.
// Second, to observe a closure, you must execute a function in a different scope than where that function was originally defined.

function greeting(msg) {
    return function who(name) {
        console.log(`${ msg }, ${ name }!`);
    };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");
hello('Jane')
howdy('John')

// First, greeeting() outer func is exectued, creating instance of inner func who();
// that fnc closes over var msg, which is the param from the outer scope of greeting().
// When the inner func is returned, its ref is assigned to hello var in outer scope.
// Then we call greeting, a second time, creating a new inner func instance,
// with a new closure over a new msg, and return that ref to be assinged to howdy.

// When the greeting(..) function finishes running, normally we would expect all of its variables to be garbage collected (removed from memory). 
// We'd expect each msg to go away, but they don't. The reason is closure. Since the inner function instances are still alive (assigned to hello and howdy, respectively), their closures are still preserving the msg variables.

// These closures are not a snapshot of the msg variable's value; they are a direct link and preservation of the variable itself. 
// That means closure can actually observe (or make!) updates to these variables over time.

function counter(step = 1) {
    var count = 0;
    return function increaseCount(){
        count = count + step;
        return count;
    };
}

var incBy1 = counter(1);
var incBy3 = counter(3);

console.log(incBy1());       // 1
console.log(incBy1());       // 2

console.log(incBy3());       // 3
console.log(incBy3());       // 6
console.log(incBy3());       // 9

// Each instance of the inner increaseCount() function is closed over both the count and step variables from its outer counter(..) function's scope. 
// step remains the same over time, but count is updated on each invocation of that inner function. 
// Since closure is over the variables and not just snapshots of the values, these updates are preserved.

// Closure works with async code as well

function getSomeData(url) {
    ajax(url,function onResponse(resp){
        console.log(
            `Response (from ${ url }): ${ resp }`
        );
    });
}

getSomeData("https://some.url/wherever");
// Response (from https://some.url/wherever): ...

// The inner function onResponse(..) is closed over url, and thus preserves and remembers it until the Ajax call returns and executes onResponse(..). 
// Even though getSomeData(..) finishes right away, the url parameter variable is kept alive in the closure for as long as needed