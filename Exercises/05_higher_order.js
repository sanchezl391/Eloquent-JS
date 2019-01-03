// Use the reduce method in combination with the concat method to “flatten” an array 
//  of arrays into a single array that has all the elements of the original arrays.

let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here
let reducer = (accumulator, currentVal) => accumulator.concat(currentVal);
console.log(arrays.reduce(reducer));

// Your own loop
// Write a higher-order function loop that provides something like a for loop 
//  statement. It takes a value, a test function, an update function, and a 
//  body function. Each iteration, it first runs the test function on the 
//  current loop value and stops if that returns false. 
//  Then it calls the body function, giving it the current value. Finally, it calls the 
//  update function to create a new value and starts from the beginning.

// When defining the function, you can use a regular loop to do the actual looping.

let loop = (value, testFunction, updateFunction, bodyFunction) => {
    if (testFunction(value))
        bodyFunction(value);
    else 
        return;
    value = updateFunction(value);
    loop(value, testFunction, updateFunction, bodyFunction);
};
loop(3, n => n > 0, n => n - 1, console.log);

// Analogous to the some method, arrays also have an every method. 
//  This one returns true when the given function returns true for every element
//  in the array. In a way, some is a version of the || operator that acts on arrays,
//  and every is like the && operator.

// Implement every as a function that takes an array and a predicate function as 
//  parameters. Write two versions, one using a loop and one using the some method.
let every1 = (arr, predFunc) => {
    for(let el of arr) {
        if(!predFunc(el))
            return false;
    }
    return true;
};

let every2 = (arr, predFunc) => {
    !arr.some(element => !predFunc(element));
};
console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));

// Write a function that computes the dominant writing direction in a string of text.
//  Remember that each script object has a direction property that can be "ltr" 
//  (left to right), "rtl" (right to left), or "ttb" (top to bottom).

// The dominant direction is the direction of a majority of the characters that 
//  have a script associated with them. The characterScript and countBy functions 
//  defined earlier in the chapter are probably useful here.
function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        return script;
      }
    }
    return null;
}

function dominantDirection(text) {
    let counted = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({name}) => name != "none");
  
    if (counted.length == 0) return "ltr";
  
    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
  }
