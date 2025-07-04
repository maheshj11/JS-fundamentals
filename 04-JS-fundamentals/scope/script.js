// ****************************************
//              Scopes
// ****************************************


// In JavaScript, scope defines the accessibility and lifetime of variables, functions, and objects during the execution of code. 
// Think of scope as a set of rules that tells you where in your code you can access certain identifiers (like variables or functions).

// JavaScript has four primary types of scope.

// 1. Global Scope
//    Variables declared outside any function or block are in the global scope.
//   🟢 Accessible everywhere in your code.
//    let siteName = "Copilot";

function greet() {
  console.log(siteName); // ✅ Accessible
}

// 2. Function Scope
//    Variables declared with var inside a function are scoped only to that function.
//    🟠 Invisible outside the function.

function test() {
  var secret = 42;
}
console.log(secret); // ❌ ReferenceError

// 3. Block Scope
//    Variables declared with let or const inside {} (like in if, for, or function blocks) are block scoped.
//    🔵 Not accessible outside that block.

if (true) {
  let mood = "focused";
}
console.log(mood); // ❌ ReferenceError

// 4. Module Scope
//    In ES6 modules, any variable declared is scoped to the module file, not global.
//    🟣 Prevents global namespace pollution.

// in myModule.js
const apiKey = "123"; // Only accessible inside this module

// *********************************************
//          Lexical Scope(Static Scope)
// *********************************************

// Lexical Scope: Functions can access variables based on where they were defined, not called. It’s how JS builds the scope chain.

function outer() {
  let outerVar = "accessible";

  function inner() {
    console.log(outerVar); // ✅ lexical access
  }

  return inner;
}

const fn = outer();
fn(); // Logs "accessible"

// Even though inner is executed outside outer, it still has access to outerVar.

// Closures are the result of lexical scoping and function behavior. If a function "remembers" the variables from its parent even after the parent has finished executing, it forms a closure.


// *************************
//          Shadowing
// *************************

// In JavaScript, shadowing happens when a variable in a local scope (like inside a function or block) has the same name as a variable in an outer scope. 
// The local variable “shadows” or hides the outer one within its scope.

let message = "Hello from global";

function greet() {
  let message = "Hello from function";
  console.log(message);
}

greet(); // → "Hello from function"
console.log(message); // → "Hello from global"


// Global Unshadowing Trick

// It is possible to access a global variable from a scope where that variable has been shadowed, but not through a typical lexical identifier reference.

var studentName = "Suzy";

function printStudent(studentName) {
    console.log(studentName);
    console.log(window.studentName);
}

printStudent("Frank");
// "Frank"
// "Suzy"

// Notice the window.studentName reference? This expression is accessing the global variable studentName as a property on window (which we're pretending for now is synonymous with the global object). 
// That's the only way to access a shadowed variable from inside a scope where the shadowing variable is present.

// The window.studentName is a mirror of the global studentName variable, not a separate snapshot copy. Changes to one are still seen from the other, in either direction. You can think of window.studentName as a getter/setter that accesses the actual studentName variable. 
// As a matter of fact, you can even add a variable to the global scope by creating/setting a property on the global object.