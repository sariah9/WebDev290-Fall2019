//Activity 1
console.log(jsHoist());

function jsHoist(){
  let example1 = 48;
  let example2 = 5 + example1;
 return example2;
}

//-> 53
//Because of hoisting, there is no error, not even 'undefined'

//------------------------------------------------------------//
let badExample;

console.log(badExample);
//->'undefined'
//There is no error, because this is another example of hoisting

console.log(callB4Assign());
//->'ReferenceError: not defined'
//This is not allowed at all

console.log(badExample());
//->'ReferenceError: not defined'
//This is also not allowed

badExample = function callB4Assign() {
    return "This is fun!";
}

let goodExample = function callAfter() {
    return "This is fun!";
}

console.log(goodExample());
//-> "This is fun!"
//This is accepted as a function call

console.log(callAfter());
//->'ReferenceError: not defined'
//This is also not allowed
