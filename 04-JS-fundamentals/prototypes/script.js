// ****************************************
//              Prototypes
// ****************************************

// Where this is a characteristc of func execution, prototype is a characteristc of an obj
// and specifically  resolution of a property access.

// Think property as a linkage between two objs. the linkage is hidden behind the scenes,
// This prototype linkage occurs when an obj is created, it's linked to another obj that already exists

// A series of objects linked together via prototypes is called the "prototype chain."

// The purpose of this prototype linkage (i.e., from an object B to another object A) is so that accesses against B for properties/methods that B does not have, are delegated to A to handle. 
// Delegation of property/method access allows two (or more!) objects to cooperate with each other to perform a task.

var homeWork = {
    topic: "JS"
}

console.log(homeWork.toString());

// The homework object only has a single property on it: topic. However, its default prototype linkage connects to the Object.prototype object, which has common built-in methods on it like toString() and valueOf(), among others.

// We can observe this prototype linkage delegation from homework to Object.prototype

// ****************************************
//        Object Linkage
// ****************************************

// To define an object prototype linkage, you can create the object using the Object.create(..) utility:

var homework = {
    topic: "JS"
};

var otherHomework = Object.create(homework);

otherHomework.topic;   // "JS"
// The first argument to Object.create(..) specifies an object to link the newly created object to, and then returns the newly created (and linked!) object.

// Figure below shows how the three objects (otherHomework, homework, and Object.prototype) are linked in a prototype chain:

                    // ***************************//
                    //        Object.prototype    //
                    //                            //
                    //          toString()        //
                    // ***************************//
                                // ^
                                // | // [[prototype]]
                                // |
                    // ***************************//
                    //          homework          //
                    //                            //
                    //         topic: "JS"        //
                    // ***************************//
                                // ^
                                // | // [[prototype]]
                                // |
                    // ***************************//
                    //        otherHomework       //
                    //                            //
                    //                            //
                    // ***************************//

// Delegation through the prototype chain only applies for accesses to lookup the value in a property. If you assign to a property of an object, 
// that will apply directly to the object regardless of where that object is prototype linked to.


// TIP:
// Object.create(null) creates an object that is not prototype linked anywhere, 
// so it's purely just a standalone object; in some circumstances, that may be preferable.

Consider:

homework.topic;
// "JS"

otherHomework.topic;
// "JS"

otherHomework.topic = "Math";
otherHomework.topic;
// "Math"

homework.topic;
// "JS" -- not "Math"

// The assignment to topic creates a property of that name directly on otherHomework; there's no effect on the topic property on homework. 
// The next statement then accesses otherHomework.topic, and we see the non-delegated answer from that new property: "Math".

// The topic on otherHomework is "shadowing" the property of the same name on the homework object in the chain.

// ***************************
//        this Revisited    
// ***************************

// this truly shines when consedering how it powers prototype-delegated func calls.
// this supports dynamic context based on how func is called, so method calls on objs
// which delegate through the prototype chain still maintain the expected this.

var homework = {
    study() {
        console.log(`Please study ${this.topic}`)
    }
}

var jsHomework = Object.create(homework);
console.log(jsHomework.study());

jsHomework.topic = 'JS'
console.log(jsHomework.study());
// Please study JS

var mathHomework = Object.create(homework);

mathHomework.topic = 'Math'
console.log(mathHomework.study());
// Please study Math

// The two objects jsHomework and mathHomework each prototype link to the single homework object, 
// which has the study() function. jsHomework and mathHomework are each given their own topic property

                    // ***************************//
                    //        Object.prototype    //
                    //                            //
                    //          toString()        //
                    // ***************************//
                                // ^
                                // | // [[prototype]]
                                // |
                    // ***************************//
                    //          homework          //
                    //                            //
                    //           study()          //
                    // ***************************//
                        // ^                // ^                          
        // [[prototype]]   |                // | // [[prototype]]
                        // |                // |
        // ***********************//  // **********************//
        //      jsHomework        //  //    mathHomework       //
        //                        //  //                       //
        //      topic: "JS"       //  //      topic: "Math"    //
        // ***********************//  //********************** //

// What happens:

// First step:

// var homework = {
//     study() {
//         console.log(`Please study ${this.topic}`)
//     }
// }

// Obj creation : A new plain JS obj is created in memory. Let's call it homework.
// Method def: Inside obj, a property named study is defined. The value of this method is anonymous func.
//     . This func is a method bcoz it's a proprty of an obj.
//     . The this value inside the study will depend on how the study is called.
//     . when study() is called, this will refer to the obj on which the method was invoked.

// Protype Linkage: Like all objects created with object literal syntax ({}), homework's internal [[Prototype]]
//                  is automatically linked to Object.prototype

// Step 2:

// var jsHomework = Object.create(homework);

// Object.create(): Object.create() method is invoked (this method is used to explicitly set prototype of a new obj)
// A brand new, empty JS obj is created in memory i.e., jsHomework.

// Protype Linkage: Object.create(homework) sets internal [[prototype]] of jsHomework to homeowrk obj.

// Step 3: jsHomework.topic = "JS";

// A new topic property is added directly to the jsHomework obj and assigned to "JS".
// This ia an "own" property of jsHomeowrk.
// If homework also had a topic property, this new topic on jsHomework would "shadow" or override it when accessed via jsHomework.

// Step 4: Calling the study() Method - jsHomework.study();

// Prototype Chain Traversal: The JS engine tries to find a property named study on the jsHomework object but it does not find it.
//          JS then looks at jsHomework's prototype i.e., homework obj, it finds it and the func associated with homework.study is executed.


// this binding: As study was called as a method of jsHomework, this automatically is bound to the jsHomework obj on which the method is called.

// Since this is jsHomework, it looks for jsHomework.topic.
// jsHomework does have an "own" property topic with the value "JS".
// So, this.topic evaluates to "JS".