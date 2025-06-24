//console is an object and log is a method of the console.

console.table({name:"dane", email:"dane@gmail.com"})

console.group("simple");
console.log("fire");
console.warn("warning")
console.groupEnd()

// we can style the console

const styles = "padding: 10px; background: black; color: red";
console.log('%cHello World', styles)