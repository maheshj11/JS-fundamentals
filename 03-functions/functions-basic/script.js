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