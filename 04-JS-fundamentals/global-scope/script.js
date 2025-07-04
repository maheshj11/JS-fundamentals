// ****************************************
//              Global Scope
// ****************************************


// In JavaScript, scope defines the accessibility and lifetime of variables, functions, and objects during the execution of code.

// In JavaScript, the global scope is the outermost scope—it's like the main stage where any variable or function declared outside of any block, function, or module lives and breathes 🪐.

// It's the default scope when you're not inside a function, block, or module.
// Variables declared in the global scope can be accessed anywhere in your code (except in modules, where scope is a bit stricter).


var name = "Alice";       // Attached to window.name in the browser
let mood = "Curious";     // Not attached to window (block scoped)
const age = 30;           // Also not added to window

// var is truly global (gets attached to window), 
// but let and const don't pollute the global object even though they're globally scoped in files.


// Bonus: In ES6 Modules
// When using type="module" in your HTML or .mjs files in Node:

//html
<script type="module">
  const secret = "shhh"; // Not global
</script>

// Variables in ES6 modules are module-scoped, not global—so no accidental global pollution.


// *********************************************
//          Browser "Window" Global scope
// *********************************************
// In browsers, the global object is window.


var studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}

hello();
// Hello, Kyle!

// This code may be loaded in a web page environment using an inline <script> tag, a <script src=..> script tag in the markup, or even a dynamically created <script> DOM element. In all three cases, the studentName and hello identifiers are declared in the global scope.
// That means if you access the global object (commonly, window in the browser), you'll find properties of those same names there:

function hello() {
    console.log(`Hello, ${ window.studentName }!`);
}

window.hello();

// Hello, Kyle!


// *********************************************
//         Globals Shadowing Globals
// *********************************************

window.something = 42;

let something = "Kyle";

console.log(something);
// Kyle

console.log(window.something);
// 42


// The let declaration adds a something global variable but not a global object property (see Chapter 3). The effect then is that the something lexical identifier shadows the something global object property.
// A simple way to avoid this gotcha with global declarations: always use var for globals. Reserve let and const for block scopes


// One surprising behavior in the global scope you may encounter with browser-based JS applications: a DOM element with an id attribute automatically creates a global variable that references it.
<ul id="my-todo-list">
   <li id="first">Write a book</li>
   ..
</ul>

window["my-todo-list"];
// <ul id="my-todo-list">..</ul>

// If the id value is a valid lexical name (like first), the lexical variable is created. If not, the only way to access that global is through the global object (window[..]).
// The auto-registration of all id-bearing DOM elements as global variables is an old legacy browser behavior that nevertheless must remain because so many old sites still rely on it. 
// My advice is never to use these global variables, even though they will always be silently created.



// ****************************************
//              (Window) Name
// ****************************************
var name = 42;

console.log(name, typeof name);
// "42" string

// window.name is a pre-defined "global" in a browser context; it's a property on the global object, so it seems like a normal global variable.
// We used var for our declaration, which does not shadow the pre-defined name global property. That means, effectively, the var declaration is ignored, since there's already a global scope object property of that name. 
// As we discussed earlier, had we used let name, we would have shadowed window.name with a separate global name variable.

// But the truly surprising behavior is that even though we assigned the number 42 to name (and thus window.name), when we then retrieve its value, it's a string "42"! 
// In this case, the weirdness is because name is actually a pre-defined getter/setter on the window object, which insists on its value being a string value. Yikes!


// ****************************************
//              Web Workers
// ****************************************

// Web Workers allow you to run JavaScript code in a separate thread from the main browser thread. 
// This means you can perform CPU-intensive tasks (like crunching numbers, parsing large files, or handling real-time data) without blocking the UI.

// JavaScript is single-threaded by default. That means if you run a long task (like a loop or a big calculation), it can freeze the page—no clicks, no scrolls, no animations.

// Web Workers solve this by:

// Running code in the background
// Communicating with the main thread via messages
// Keeping the UI responsive and smooth

// Since these Web Worker programs run on a separate thread, they're restricted in their communications with the main application thread, to avoid/limit race conditions and other complications. 
// Web Worker code does not have access to the DOM, for example. Some web APIs are, however, made available to the worker, such as navigator.

// Since a Web Worker is treated as a wholly separate program, it does not share the global scope with the main JS program. However, the browser's JS engine is still running the code, so we can expect similar purity of its global scope behavior.
// Since there is no DOM access, the window alias for the global scope doesn't exist.

// In a Web Worker, the global object reference is typically made using self:

var studentName = "Kyle";
let studentID = 42;

function hello() {
    console.log(`Hello, ${ self.studentName }!`);
}
self.hello(); // Hello, Kyle!
self.studentID; // undefined

// Just like JS programs, var and function declarations create mirrored properties on the global object (aka, self), where other declarations (let, etc) do not.

// ****************************************
//              ES Modules (ESM)
// ****************************************

// ES6 introduced first-class support for the module pattern. One of the most obvious impacts of using ESM is how it changes behaviour of the observably top-level scope in file.

var studentName = "Kyle";

function hello() {
    console.log(`Hello, ${ studentName }!`);
}

hello();
// Hello, Kyle!

export hello;

// If the code is in a file that's loaded as an ES module, it will run exactly yhe same. However, the observable effects are diff.
// Despite being declared at top level of the module, the outermost scope, studentName and hello are not global variables.
// Instead, they are module-wide(module-global)

// However, in a module there's no implicit "module-wide scope object" for these top-level declarations to be added to as properties, as there is when declarations appear in the top-level of non-module JS files.
// This is not to say that global variables cannot exist or be accessed in such programs. It's just that global variables don't get created by declaring variables in the top-level scope of a module.

// The module's top-level scope is descended from the global scope, almost as if the entire contents of the module were wrapped in a function. 
// Thus, all variables that exist in the global scope (whether they're on the global object or not!) are available as lexical identifiers from inside the module's scope.


// ****************************************
//              Node
// ****************************************

// In Node.js, it’s global.

global.foo = "bar";
console.log(global.foo); // 'bar'

// BUT: Variables defined with var, let, or const at the top level of a file are NOT global.


var localVar = "hello";
console.log(global.localVar); // undefined

// Even though localVar is declared at the top level, it’s scoped to the file (module), not globally accessible via global.

// Every .js file in Node is treated as a separate CommonJS module, which means:

  // Each file has its own lexical scope
  // Top-level variables are local to that module, not shared

// Before processing, Node effectively wraps such code in a function, so that the var and function declarations are contained in that wrapping function's scope, not treated as global variables.
// Envision the preceding code as being seen by Node as this (illustrative, not actual):

function Module(module,require,__dirname,...) {
    var studentName = "Kyle";

    function hello() {
        console.log(`Hello, ${ studentName }!`);
    }

    hello();
    // Hello, Kyle!

    module.exports.hello = hello;
} 

// Node then essentially invokes the added Module(..) function to run your module. 
// You can clearly see here why studentName and hello identifiers are not global, but rather declared in the module scope.

// We can use global object intentionally:
  
  global.config = { env: "production" };
