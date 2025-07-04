// What Is the Build Phase for React/Angular?


// The Build Phase is when your source code (JSX, TypeScript, SCSS, etc.) is:

// Transpiled into browser-compatible JavaScript

// Bundled into fewer files

// Minified to reduce size

// Optimized for performance (e.g., tree-shaking, code splitting)

// This phase ensures your app loads fast, runs efficiently, and is ready for deployment.


// ******************************************************
// React Build Phase (e.g., using Vite, CRA, or Webpack)
// ******************************************************

// 🔹 1. Transpilation
// JSX → JavaScript (via Babel or SWC)

// TypeScript → JavaScript (if used)

// Modern JS → ES5/ES6 for browser compatibility

// 🔹 2. Bundling
// All modules and dependencies are combined into chunks (e.g., main.[hash].js)

// Tools: Webpack, Vite, Parcel

// 🔹 3. Minification & Tree-Shaking
// Removes whitespace, comments, and unused code

// Tree-shaking eliminates dead code from libraries

// 🔹 4. Code Splitting
// Breaks app into smaller chunks (e.g., per route or component)

// Improves initial load time

// 🔹 5. Asset Optimization
// Compresses images, fonts, and CSS

// Adds content hashes to filenames for long-term caching

// 🔹 6. Output
// Files are placed in /build or /dist

// Includes index.html, JS/CSS chunks, and static assets

// ****************************************
//  Angular Build Phase (via Angular CLI)
// ****************************************

// 🔸 1. Ahead-of-Time (AOT) Compilation
// Angular templates are compiled into JS during build time

// Reduces runtime overhead and improves performance

// 🔸 2. TypeScript Compilation
// Converts .ts files into JavaScript

// 🔸 3. Bundling & Optimization
// Uses Webpack or esbuild to bundle modules

// Minifies and tree-shakes code

// Removes unused Angular features (zone.js, i18n, etc.)

// 🔸 4. Environment Replacement
// Replaces environment.ts with environment.prod.ts for production settings

// 🔸 5. Output
// Files are placed in /dist/project-name

// Includes hashed JS/CSS files, index.html, and assets


// *******************************************
//      React: Most Used & Emerging Bundlers
// *******************************************
// Bundler	    Description	                    Popularity & Use Case
// Webpack	    The long-time standard; 
//              highly configurable 
//              and powerful	                Still widely used (e.g., in Create React App)
// Vite	        Lightning-fast dev 
//              server + Rollup-based 
//              bundler for production	        Rapidly growing; default in many new projects
// esbuild	    Ultra-fast bundler written
//              in Go; used in tools like Vite  Great for speed-focused builds
// SWC	        Rust-based compiler; used 
//              by Next.js and others for 
//              blazing-fast builds	            Gaining traction in modern React setups
// Rollup	    Focused on library bundling;
//              used under the hood by Vite	    Ideal for publishing React libraries


// > 🔥 Vite and Webpack are currently the most popular bundlers for React, with Vite gaining serious momentum due to its speed and simplicity

//ANGULAR USES WEBPACK INTERNALLY VIA ANGULAR CLI


// *******************************************
//   Most Common Transpilers Used with React
// *******************************************
// Transpiler	Purpose	                            Notes
// Babel	    Converts JSX and modern JavaScript
//              (ES6+) to ES5	                    Most widely used with React; highly customizable with plugins
// SWC	        Super-fast compiler written in 
//              Rust; supports JSX and TypeScript	Gaining popularity; used by Next.js and Vite for blazing-fast builds
// esbuild	    Extremely fast bundler and 
//              transpiler written in Go	        Great for dev builds; supports JSX and TypeScript
// TypeScript	Transpiles .tsx files to JavaScript Often used alongside Babel or SWC for type-checking and transpilation


// Transpiler vs Compiler: What’s the Difference?

// Term	Meaning
// Transpiler ---- Converts code from one version of a language to another (e.g. ES6 → ES5)
// Compiler ------ Converts high-level code into lower-level code (e.g. TS → JS or JS → bytecode)