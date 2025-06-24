// ****************************************
//              Iteration
// ****************************************
// The itterator pattern defines a data structure called an "itterator" that has reference to underlying data source(like the query result rows),
// which exposed a method like next(). Calling next() returns the next item/record in data.

// ES6 standardized a specific protocol for the itterator pattern directly in language.
// It defines next() method whose returm is an object called an itterator result.
// The obj has value and done properties.done is a boolean that is false until the iteration over the data complets.

// ES6 included several mechanisms (syntax and APIs) for standardized consumption of these iterators.
// One such mechanism is for..of loop
// Anoter is the ... operator, it has two forms spread and rest.
// Both the cases follow the iterator-consumption protocol

// ES6 defined the basic data structure/collection types in JS as iterables.
// This includes strings, arrays, maps, sets, and others.

// Examples
// Map
var buttonNames = new Map();
buttonNames.set(btn1,"Button 1");
buttonNames.set(btn2,"Button 2");

for (let [btn,btnName] of buttonNames) {
    btn.addEventListener("click",function onClick(){
        console.log(`Clicked ${ btnName }`);
    });
}

// In the for..of loop over the default map iteration, we use the [btn,btnName] syntax (called "array destructuring") to break down each consumed tuple into the respective key/value pairs (btn1 / "Button 1" and btn2 / "Button 2").

// Each of the built-in iterables in JS expose a default iteration, one which likely matches your intuition. But you can also choose a more specific iteration if necessary. 
// For example, if we want to consume only the values of the above buttonNames map, we can call values() to get a values-only iterator:

for (let btnName of buttonNames.values()) {
    console.log(btnName);
}
// Button 1
// Button 2

// same for entries
var arr = [ 10, 20, 30 ];

for (let [idx,val] of arr.entries()) {
    console.log(`[${ idx }]: ${ val }`);
}
// [0]: 10
// [1]: 20
// [2]: 30

//For the most part, all built-in iterables in JS have three iterator forms available: keys-only (keys()), values-only (values()), and entries (entries()).




// What is Iterator

// In JS, an iterator is an obj that provides a way to access elements of a collection sequentially.
// It follows ierator protocol which required next() method.

// Iterable: An object is iterable if it has a Symbol.iterator method that returns an iterator.

// Basic Iterator

const myArr = [1, 2, 3, 4];

const iterator = myArr[Symbol.iterator]();
console.log(iterator);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// Custom iterator like method

const myObj = {
  a: [0, 1, 2],
  i: 0,
  next() {
    let op;
    if (this.i < this.a.length - 1) {
      op = { value: this.a[this.i], done: false };
    } else {
      op = { value: undefined, done: true };
    }
    this.i++;
    return op;
  },
};

console.log(myObj.next());
console.log(myObj.next());
console.log(myObj.next());

//make an obj iterable

const newObj = {
  aa: [0, 1, 2],
  [Symbol.iterator]() {
    let op;
    let i = 0;
    const newThis = this
    return {
      next() {
        if (i <= newThis.aa.length - 1) {
          op = { value: newThis.aa[i], done: false };
        } else {
          op = { value: undefined, done: true };
        }
        i++;
        return op;
      },
    };
  },
};

// console.log(newObj[Symbol.iterator]().next())
for (const val of newObj){
    console.log("val", val)
}

// Reason
// An object is iterable if it has a method with the key [Symbol.iterator] that returns an iterator.
// for...of Loop:
// The for...of loop is designed to work with iterables. It automatically calls the [Symbol.iterator] method to get an iterator and repeatedly calls next() until done is true, using the value property in each iteration.
// By default, plain objects are not iterable (e.g., you can’t use for...of on {}), but we’ll make this object iterable by adding a [Symbol.iterator] method.

// The [Symbol.iterator] property is a method that makes myIterable conform to the iterable protocol.
// It’s defined using square bracket notation ([Symbol.iterator]) because Symbol.iterator is a symbol, not a string.
// The method returns an iterator object that will control the iteration process.
// let index = 0: Declares a variable index to track the current position in the data array. 
// This variable is scoped to the iterator instance, so each time [Symbol.iterator] is called, a new index is initialized.

// The return statement creates an iterator object with a next method, satisfying the iterator protocol.
// The next method is defined as an arrow function (() => { ... }) that returns an object with value and done properties.
// Accessing this.data:
// Inside the next method, this refers to myIterable (the object defining [Symbol.iterator]), not the iterator object itself.
// This is because the arrow function inherits the this context from the [Symbol.iterator] method, which is bound to myIterable.
// Thus, this.data accesses ['x', 'y', 'z'].

// The for...of loop:
// Calls myIterable[Symbol.iterator]() to get a new iterator.
// Repeatedly calls the iterator’s next() method.
// Uses the value property as the loop variable (value) and stops when done is true.