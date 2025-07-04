function range(start, end) {
  if (end === undefined) {
    return function (end) {
      return getArray(start, end);
    };
  }
  return getArray(start, end);
}

function getArray(start, end) {
  let list = [];
  for (x = start; x <= end; x++) {
    list.push(x);
  }
  return list;
}

// range(3,3);
console.log('range(3,3)', range(3, 3));
console.log('range(3,0)', range(3, 1));
console.log('range(3,9)', range(3, 9));

var start4 = range(4);
console.log('fire123', start4(6));
// start4(6);     // [4,5,6]

// Prototypes

// var reel = {
//   symbols: ['♠', '♥', '♦', '♣', '☺', '★', '☾', '☀'],
// };

var slotMachine = {
  values : [],
  symbols: ['♠', '♥', '♦', '♣', '☺', '★', '☾', '☀'],
  randMax() {
    return Math.floor(Math.random() * this.symbols.length);
  },
  spin() {
    for (i = 0; i < 9; i++) {
      // console.log(this.symbols[this.randMax()]);
      // console.log(this.values);
      this.values.push(this.symbols[this.randMax()])
    }
  },
  display() {
    console.log("fire", this.values)
    let newValues = []
    let newarr = []
    for(i=0;i<=this.values.length;i++){debugger
      if(i !== 0 && i%3 === 0){
        newValues.push(newarr.join('|'))
        newarr = []
        newarr.push(this.values[i])
      }
      else {
        newarr.push(this.values[i])
      }
    }
    console.log(newValues.join('\n'))
    // return newValues.join('\n')
  },
};
slotMachine.spin();
slotMachine.display();
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

// slotMachine.spin();
// slotMachine.display();
