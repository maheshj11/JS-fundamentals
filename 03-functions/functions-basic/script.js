// ****************************************
//              Fucntions
// ****************************************

// In JS, we should consider "function" to take the broader meaning of another related term: "procedure."
//  A procedure is a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.

// OLD SYNTAX
function awesomeFunction(coolThings) {
    // ..
    return amazingStuff;
}

// This is called a function declaration because it appears as a statement by itself, not as an expression in another statement. The association between the identifier awesomeFunction and the function value happens during the compile phase of the code, before that code is executed.

// In contrast to a function declaration statement, a function expression can be defined and assigned like this:

// let awesomeFunction1 = ..
// const awesomeFunction1 = ..
var awesomeFunction1 = function () {
    return amazingStuff1
}

// This function is an expression that is assigned to the variable awesomeFunction.
// Different from the function declaration form, a function expression is not associated with its identifier until that statement during runtime.

// It's extremely important to note that in JS, functions are values that can be assigned (as shown in this snippet) and passed around.
// In fact, JS functions are a special type of the object value type. 
// Not all languages treat functions as values, but it's essential for a language to support the functional programming pattern, as JS does.

function greeting(myName) {
    console.log(`Hello, ${ myName }!`);
}

greeting("Kyle");   // Hello, Kyle!

// In this snippet, myName is called a parameter, which acts as a local variable inside the function. 


var awesomeFunction = function(coolThings) {
    // ..
    return amazingStuff;
};

// The function expression here is referred to as an anonymous function expression, since it has no name identifier between the function keyword and the (..) parameter list. 
// This point confuses many JS developers because as of ES6, JS performs a "name inference" on an anonymous function:

awesomeFunction.name;
// "awesomeFunction"

// The name property of a function will reveal either its directly given name (in the case of a declaration) or its inferred name in the case of an anonymous function expression.
// name inference only happens in limited cases such as when the function expression is assigned (with =).
// Even if a name is inferred, it's still an anonymous function. Why? Because the inferred name is a metadata string value, not an available identifier to refer to the function. 
// An anonymous function doesn't have an identifier to use to refer to itself from inside itself—for recursion, event unbinding, etc.


// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function someName(coolThings) {
    // ..
    return amazingStuff;
};

awesomeFunction.name;
// "someName"

// FUNCTION FORMS

// IIFE
(function(){ .. })();
(function namedIIFE(){ .. })();

// asynchronous IIFE
(async function(){ .. })();
(async function namedAIIFE(){ .. })();

// arrow function expressions
var f;
f = () => 42;
f = x => x * 2;
f = (x) => x * 2;
f = (x,y) => x * y;
f = x => ({ x: x * 2 });
f = x => { return x * 2; };
f = async x => {
    var y = await doSomethingAsync(x);
    return y * 2;
};
someOperation( x => x * 2 );
// ..

// Keep in mind that arrow function expressions are syntactically anonymous, meaning the syntax doesn't provide a way to provide a direct name identifier for the function. 
// The function expression may get an inferred name, but only if it's one of the assignment forms, not in the (more common!) form of being passed as a function call argument (as in the last line of the snippet).