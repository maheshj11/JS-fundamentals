// ****************************************
//              this
// ****************************************

// Misconception is that this refers to func itself, anoter is this points
// the instance that a method belongs to. Both are incorrect

// functions have another characteristic besides their scope that influences what they can access.
// This characteristic is best described as an execution context, and it's exposed to the function via its this keyword.

// Scope is static and contains a fixed set of variables available at the moment and location you define a function, but a function's execution context is dynamic,
// entirely dependent on how it is called (regardless of where it is defined or even called from).

// this is not a fixed characteristic of a function based on the function's definition, but rather a dynamic characteristic that's determined each time the function is called.

// One way to think about the execution context is that it's a tangible object whose properties are made available to a function while it executes. Compare that to scope, which can also be thought of as an object; except,
// the scope object is hidden inside the JS engine, it's always the same for that function, and its properties take the form of identifier variables available inside the function.

// ****************************************
//         What exactly is this?
// ****************************************

// In JS, this is a special keyword that refers to the context in which a piece of code is being executed
// By Default(Global Context) - when a func is called as a standalone func, this usually refers to global obj.
// In browsers this is window obj. In Node.js its the global obj.

function whatIsThis() {
  console.log(this);
}

whatIsThis(); // In a browser, this will log the 'window' object.
// In Node.js, this will log the 'global' object.

// In strict mode ("use strict";), the default binding of this inside a function is undefined.

function classroom(teacher) {
  return function study() {
    console.log(`${teacher} says to study ${this.topic}`);
  };
}

let assignment = classroom('Leena');
assignment();
//Leena says to study undefined

// In this snippet, we call assignment() as a plain, normal function, without providing it any execution context.

// Since this program is not in strict mode (see Chapter 1, "Strictly Speaking"), context-aware functions that are called without any context specified default the context to the global object (window in the browser).
// As there is no global variable named topic (and thus no such property on the global object), this.topic resolves to undefined.

// Now consider:

// ****************************************
//   Implicit Binding (Method Invocation)
// ****************************************

var homework = {
  topic: 'JS',
  assignment: assignment,
};

homework.assignment();
// Kyle says to study JS

// A copy of the assignment function reference is set as a property on the homework object, and then it's called as homework.assignment().
// That means the this for that function call will be the homework object. Hence, this.topic resolves to "JS".

// Lastly:

// ******************************************
//    Explicit Binding (call, apply, bind)
// ******************************************

// JavaScript provides ways to explicitly set the value of this when calling a function:

// call(): Calls a function with a given this value and arguments provided individually.
// apply(): Calls a function with a given this value and arguments provided as an array (or array-like object).
// bind(): Creates a new function with the this value permanently bound to the provided value. It doesn't call the function immediately.

var otherHomework = {
  topic: 'Math',
};

assignment.call(otherHomework);
// Kyle says to study Math
// A third way to invoke a function is with the call(..) method, which takes an object (otherHomework here) to use for setting the this reference for the function call.
// The property reference this.topic resolves to "Math".

assignment.apply(otherHomework);

// assignment.apply(otherHomework,"param1", "praam2");

// The only diff for bind is it does not immediately get invoked it has to be explicity called
// Bind takes params as strings and call takes array which can have all the params if it has any

// assignment.apply(otherHomework,["param1", "praam2"]);
const newAss = assignment.bind(otherHomework);
newAss();
