3 === 3.0;              // true
"yes" === "yes";        // true
null === null;          // true
false === false;        // true

42 === "42";            // false
"hello" === "Hello";    // false
true === 1;             // false
0 === null;             // false
"" === null;            // false
null === undefined;     // false

// Another way ==='s equality comparison is often described is, "checking both the value and the type". 
// In several of the examples we've looked at so far, like 42 === "42", the type of both values (number, string, etc.) does seem to be the distinguishing factor.
// There's more to it than that, though. All value comparisons in JS consider the type of the values being compared, not just the === operator. 
// Specifically, === disallows any sort of type conversion (aka, "coercion") in its comparison, where other JS comparisons do allow coercion.

// But the === operator does have some nuance to it, a fact many JS developers gloss over, to their detriment. 
// The === operator is designed to lie in two cases of special values: NaN and -0. Consider:

NaN === NaN;            // false
0 === -0;               // true

// In the case of NaN, the === operator lies and says that an occurrence of NaN is not equal to another NaN. 
// In the case of -0 (yes, this is a real, distinct value you can use intentionally in your programs!), the === operator lies and says it's equal to the regular 0 value.

// Since the lying about such comparisons can be bothersome, it's best to avoid using === for them. For NaN comparisons, use the Number.isNaN(..) utility, which does not lie. 
// For -0 comparison, use the Object.is(..) utility, which also does not lie. Object.is(..) can also be used for non-lying NaN checks, if you prefer. 
// Humorously, you could think of Object.is(..) as the "quadruple-equals" ====, the really-really-strict comparison!


// Explanation of Object.is()

// Object.is() is a static method introduced in ES6 (ECMAScript 2015) that compares two values for equality. 
// It’s often described as stricter than the strict equality operator (===) because it handles certain special cases differently, 
// though it’s not fundamentally "more strict" in all scenarios—it’s just more precise in specific edge cases like NaN and -0 vs. +0.

// This method is used to get proper results for 0 & -0 and Nan checks.
// For all other values (numbers, strings, booleans, objects, etc.), Object.is() behaves the same as ===, checking for strict equality without type coercion.

// Using Object.is()
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, 0)); // false
console.log(Object.is("hello", "hello")); // true


// The story gets even more complicated when we consider comparisons of object values (non-primitives). Consider:

// [ 1, 2, 3 ] === [ 1, 2, 3 ];    // false
// { a: 42 } === { a: 42 }         // false
// (x => x * 2) === (x => x * 2)   // false

// What's going on here?

// It may seem reasonable to assume that an equality check considers the nature or contents of the value; 
// after all, 42 === 42 considers the actual 42 value and compares it. 
// But when it comes to objects, a content-aware comparison is generally referred to as "structural equality."

// JS does not define === as structural equality for object values. Instead, === uses identity equality for object values.

// In JS, all object values are held by reference (see "Values vs References" in Appendix A), are assigned and passed by reference-copy, 
// and to our current discussion, are compared by reference (identity) equality. Consider:

var x = [ 1, 2, 3 ];

// assignment is by reference-copy, so
// y references the *same* array as x,
// not another copy of it.
var y = x;

// y === x;              // true
// y === [ 1, 2, 3 ];    // false
// x === [ 1, 2, 3 ];    // false

// In this snippet, y === x is true because both variables hold a reference to the same initial array. 
// But the === [1,2,3] comparisons both fail because y and x, respectively, are being compared to new different arrays [1,2,3]. 
// The array structure and contents don't matter in this comparison, only the reference identity.

// ****************************************
//              COERCIVE COMPARISONS
// ****************************************

// The == operator performs an equality comparison similarly to how the === performs it. 
// In fact, both operators consider the type of the values being compared. 
// And if the comparison is between the same value type, both == and === do exactly the same thing, no difference whatsoever.

// If the value types being compared are different, the == differs from === in that it allows coercion before the comparison. 
// In other words, they both want to compare values of like types, but == allows type conversions first, and once the types have been converted to be the same on both sides, then == does the same thing as ===. 
// Instead of "loose equality," the == operator should be described as "coercive equality."

Consider:

42 == "42";             // true
1 == true;              // true
// In both comparisons, the value types are different, so the == causes the non-number values ("42" and true) to be converted to numbers (42 and 1, respectively) before the comparisons are made.

// Operators like <,>,<= & >= also perform as if they're "strict" if the types being relationally compared already match, 
// but they'll allow coercion first (generally, to numbers) if the types differ.

var arr = [ "1", "10", "100", "1000" ];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
    // will run 3 times
}
// The i < arr.length comparison is "safe" from coercion because i and arr.length are always numbers. 
// The arr[i] < 500 invokes coercion, though, because the arr[i] values are all strings.
// Those comparisons thus become 1 < 500, 10 < 500, 100 < 500, and 1000 < 500.
// Since that fourth one is false, the loop stops after its third iteration.

var x = "10";
var y = "9";

x < y;      // true, watch out!

// REASON

// String Comparison is Lexicographical (Dictionary Order)

// When you use <, >, <=, >= operators to compare two strings, JavaScript doesn't try to convert them to numbers for the comparison. 
// Instead, it performs a lexicographical comparison.

// Think of it like how words are ordered in a dictionary:

// JavaScript compares the strings character by character, from left to right.
// It looks at the Unicode (UTF-16) values of each character.
// The comparison stops as soon as it finds a difference in the characters.
// The string with the character that has a lower Unicode value at the first point of difference is considered "less than" the other string.

// So for the above comparison => "1" (from "10") and "9" (from "9").
// The Unicode value of the character "1" is 49.
// The Unicode value of the character "9" is 57.