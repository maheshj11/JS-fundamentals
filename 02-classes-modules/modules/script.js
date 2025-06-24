// ****************************************
//                Modules
// ****************************************


// The module pattern has essentially the same goal as the class pattern, which is to group data and behavior together into logical units.
// Also like classes, modules can "include" or "access" the data and behaviors of other modules, for cooperation's sake.

// But modules have some important differences from classes. 
// Most notably, the syntax is entirely different.

// ****************************************
//              Classic Modules
// ****************************************


// ES6 added a module syntax form to native JS syntax, which we'll look at in a moment.
// But from the early days of JS, modules was an important and common pattern that was leveraged in countless JS programs, even without a dedicated syntax.

// The key hallmarks of a classic module are an outer function (that runs at least once), 
// which returns an "instance" of the module with one or more functions exposed that can operate on the module instance's internal (hidden) data.

// Because a module of this form is just a function, and calling it produces an "instance" of the module,
// another description for these functions is "module factories".

// Consider the classic module form of the earlier Publication, Book, and BlogPost classes:
function Book (title,author, pubDate) {
    var publicAPI = {
        print() {
            console.log(`
            Title : ${title}
            Author: ${author}
            PubDate: ${pubDate}
        `)
        }
    }
    return publicAPI
}
function Publication (title,author, pubDate, publication, ISBN) {
    var publicAPI = {
        print() {
            const pubAPI = Book(title, author, pubDate);
            pubAPI.print();
            console.log(`
            Publication : ${publication}
            ISBN: ${ISBN}
        `)
        }
    }
    return publicAPI
}
function BlogPost (title,author, pubDate,URL) {
    var publicAPI = {
        print() {
            const pubAPI = Book(title, author, pubDate);
            pubAPI.print();
            console.log(`
            URL : ${URL}
        `)
        }
    }
    return publicAPI
}
const newBook = Book(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014"
);
newBook.print();

const newPub = Publication(
    "You Don't Know JS",
    "Kyle Simpson",
    "June 2014",
    "O'Reilly",
    "123456-789"
)
newPub.print()

const newBlog = BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
)
newBlog.print()

// Comparing these forms to the class forms, there are more similarities than differences.
// the class form stores methods and data on a object instance which must be accessed with the this. prefix.
// With modules the methids and data are accessed as identifier.

// With class, the "API" instance is implicit in class def-also, all data and methods are public.
// With module factory func, you explicitly create & return an obj with any publicly exposed methods,
// any data or other inreferenced methods remain private inside the factory func.

// ****************************************
//              ES Modules
// ****************************************

// ES6 added a module syntax form to native JS syntax.

// The implemetation is different

// 1. There is no wrapper func to define a module. the wrapping context is a file.
//    ESMs are always file-based, one file one module.

// 2. You don't interact with a module's "API" explicitly, but use the export keyword to add a variable or method to its public API defination.
//    If something is defined in a module but not exported then it staus hidden(just like classic modules).

// 3. Most noticebale is you don't instantiate an ES module, you just import it to use its single instance.
//    ESMs are in effect "SINGLETONS" means only one instance is every created i.e at first import.
//    All other imports just recieve a reference to the same single instance.

function printDetails(title,author,pubDate) {
    console.log(`
        Title: ${ title }
        By: ${ author }
        ${ pubDate }
    `);
}

export function create(title,author,pubDate) {
    var publicAPI = {
        print() {
            printDetails(title,author,pubDate);
        }
    };

    return publicAPI;
}

// To import and use this module, from another ES module like blogpost.js:

import { create as createPub } from "publication.js";

function printDetails(pub,URL) {
    pub.print();
    console.log(URL);
}

export function create(title,author,pubDate,URL) {
    var pub = createPub(title,author,pubDate);

    var publicAPI = {
        print() {
            printDetails(pub,URL);
        }
    };

    return publicAPI;
}

// And finally, to use this module, we import into another ES module like main.js:

import { create as newBlogPost } from "blogpost.js";

var forAgainstLet = newBlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let

// As shown, ES modules can use classic modules internally if they need to support multiple-instantiation. 
// Alternatively, we could have exposed a class from our module instead of a create(..) factory function, with generally the same outcome.
// However, since you're already using ESM at that point, I'd recommend sticking with classic modules instead of class.

// If your module only needs a single instance, you can skip the extra layers of complexity: export its public methods directly.