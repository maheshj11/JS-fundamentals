// ****************************************
//          How We Organize in JS
// ****************************************


// Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: classes and modules. 
// These patterns are not mutually exclusive; many programs can and do use both. Other programs will stick with just one pattern, or even neither!

// In some respects, these patterns are very different. But interestingly, in other ways, they're just different sides of the same coin. 
// Being proficient in JS requires understanding both patterns and where they are appropriate (and not!).

// ****************************************
//              Class
// ****************************************

// A class in a program is a definition of a "type" of custom data structure that includes both data and behaviors that operate on that data.
// Classes define how such a data structure works, but classes are not themselves concrete values.
// To get a concrete value that you can use in the program, a class must be instantiated (with the new keyword) one or more times.


class Page {
    constructor(text){
        this.text = text
    }

    print() {
        console.log(this.text)
    }
}

class NoteBook {
    constructor() {
        this.pages=[]
    }

    addPage(text) {
        const page = new Page(text)
        this.pages.push(page);
    }

    print(){
        for(let page of this.pages){
            page.print()
        }
    }
}

let books = new NoteBook();
books.addPage("trigno");
books.addPage("maths")

books.print()

// In the Page class, the data is a string of text stored in a this.text member property. The behavior is print(), a method that dumps the text to the console.

// For the Notebook class, the data is an array of Page instances. The behavior is addPage(..), a method that instantiates new Page pages and adds them to the list, as well as print() (which prints out all the pages in the notebook).

// The statement mathNotes = new Notebook() creates an instance of the Notebook class, and page = new Page(text) is where instances of the Page class are created.

// Behavior (methods) can only be called on instances (not the classes themselves), such as mathNotes.addPage(..) and page.print().


// ****************************************
//              CLASS INHERITANCE
// ****************************************

// Another aspect inherent to traditional "class-oriented" design, though a bit less commonly used in JS,
// is "inheritance" (and "polymorphism"). Consider:

class Publication {
    constructor(title, author, pubDate) {
        this.title = title
        this.author = author
        this.pubDate = pubDate
    }

    print() {
        console.log(`
            Title : ${this.title}
            Author: ${this.author}
            PubDate: ${this.pubDate}
        `)
    }
}

class Book extends Publication {
    constructor(bookDetails) {
        super(bookDetails.title, bookDetails.author, bookDetails.pubDate)
        this.publisher = bookDetails.publisher;
        this.ISBN = bookDetails.ISBN
    }

    print() {
        super.print();
        console.log(`
            Publisher : ${this.publisher}
            ISBN: ${this.ISBN}
        `)
    }
}

class BlogPost extends Publication{
    constructor(title, author, pubDate, URL){
        super(title, author, pubDate)
        this.URL = URL
    }
    print() {
        super.print();
        console.log(`
            URL : ${this.URL}
        `)
    }
}

// Both Book and BlogPost use the extends clause to extend the general definition of Publication to include additional behavior. 
// The super(..) call in each constructor delegates to the parent Publication class's constructor for its initialization work,
// and then they do more specific things according to their respective publication type (aka, "sub-class" or "child class").
const newBook = new Book({
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    pubDate: "June 2014",
    publisher: "O'Reilly",
    ISBN: "123456-789"
})

newBook.print();

var forAgainstLet = new BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014",
    "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();


// Notice that both child class instances have a print() method, 
// which was an override of the inherited print() method from the parent Publication class. 
// Each of those overridden child class print() methods call super.print() to invoke the inherited version of the print() method.

// The fact that both the inherited and overridden methods can have the same name and co-exist is called polymorphism.

// Inheritance is a powerful tool for organizing data/behavior in separate logical units (classes), 
// but allowing the child class to cooperate with the parent by accessing/using its behavior and data.