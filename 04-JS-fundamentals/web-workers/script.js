// ****************************************
//              Web Workers
// ****************************************
// Web Workers are like JavaScript’s way of saying, “Hey, let me handle this heavy lifting in the background so your UI doesn’t freeze.” 🧠⚙️

// 🧵 What Are Web Workers?
// Web Workers allow you to run JavaScript code in a separate thread from the main browser thread. This means you can perform CPU-intensive tasks (like crunching numbers, parsing large files, or handling real-time data) without blocking the UI.

// 🚦 Why Use Them?
// JavaScript is single-threaded by default. That means if you run a long task (like a loop or a big calculation), it can freeze the page—no clicks, no scrolls, no animations.

// Web Workers solve this by:
// Running code in the background
// Communicating with the main thread via messages
// Keeping the UI responsive and smooth


// 🛠️ How Do They Work?

// Web Workers use a message-based system with two main APIs:

// postMessage(data) → to send data
// onmessage = function (event) {} → to receive data


// 1. Create a Worker File (worker.js)

// worker.js
self.onmessage = function (e) {
  const result = e.data * 2;
  self.postMessage(result);
};

// 2. Use It in Your Main Script

const worker = new Worker("worker.js");

worker.postMessage(10); // Send data to worker

worker.onmessage = function (e) {
  console.log("Result from worker:", e.data); // 20
};

// 🚫 What Can’t Workers Do?
// No access to the DOM
// No access to window, document, or alert()
// Can’t directly manipulate UI

// But they can:
// Use fetch, XMLHttpRequest, setTimeout
// Spawn other workers
// Use importScripts() to load libraries


// Example usage

// worker.js
let i = 0;

function count() {
  i++;
  postMessage(i); // Send data back to main thread
  setTimeout(count, 500);
}

count();

// Main HTML +Script

// <!DOCTYPE html>
// <html>
//   <body>
//     <p>Count: <output id="result"></output></p>
//     <button onclick="startWorker()">Start Worker</button>
//     <button onclick="stopWorker()">Stop Worker</button>

//     <script>
//       let worker;

//       function startWorker() {
//         if (typeof Worker !== "undefined") {
//           if (!worker) {
//             worker = new Worker("worker.js");
//             worker.onmessage = function (event) {
//               document.getElementById("result").textContent = event.data;
//             };
//           }
//         } else {
//           alert("Sorry, your browser doesn't support Web Workers.");
//         }
//       }

//       function stopWorker() {
//         if (worker) {
//           worker.terminate();
//           worker = undefined;
//         }
//       }
//     </script>
//   </body>
// </html>


// If you don’t define onmessage in the main thread, the Web Worker will still keep running and posting messages with postMessage().
// But here's the catch: ➡️ Those messages will be silently ignored unless you've attached a handler like worker.onmessage = ... or added an event listener with worker.addEventListener('message', ...).

// Think of it like this:

// The Worker is a radio broadcaster 📡 sending out updates (postMessage(i)).
// If the main thread hasn't tuned into the frequency (onmessage), the messages are just lost in the void.
// No message queue is held for future listeners—once missed, it's gone.