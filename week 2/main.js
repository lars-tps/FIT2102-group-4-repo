// Surname     | Firstname     | Contribution % | Any issues?
// =====================================================
// Person 1... | Pei Sheng     | 25%
// Person 2... | Mohamed Areeb | 25%
// Person 3... |           | 25%
// Person 4... |           | 25%
//
// complete Worksheet 2 by entering code in the places marked below...
//
// For full instructions and tests open the file worksheetChecklist.html
// in Chrome browser.  Keep it open side-by-side with your editor window.
// You will edit this file (main.js), save it, and reload the
// browser window to run the test.

/**
 * Exercise 1
 */
const myObj = {
    aProperty: "A string",
    anotherProperty: 55
}
/**
 * Exercise 2
 */
function operationOnTwoNumbers(myFunc) {
    return x => y => myFunc(x,y)
}
const add = operationOnTwoNumbers((x,y) => x + y)
const addNine = add(9)
console.log(addNine(3))
/**
 * Exercise 3
 */
function callEach(myFuncs) {
    myFuncs.forEach(func => func())
}
/**
 * Exercise 4
 */
function addN(n, arr) {
    const add = operationOnTwoNumbers((x,y) => x + y)
    return arr.map(element => add(n)(element))
}

function getEvens(arr) {
    const remainder = operationOnTwoNumbers((x,y) => x % y)
    return arr.filter(element => !remainder(element)(2))
}

function multiplyArray(arr) {
    const multiply = operationOnTwoNumbers((x,y) => x * y)
    return arr.reduce(
        (accumulator, element) => element ? multiply(element)(accumulator) : multiply(1)(accumulator),
        1
    )
}
/**
 * Exercise 5
 */
 function range(n, current=0, arr = []) {
    return n ? range(n-1, current + 1, arr.concat([current])) : arr
}
/**
 * Exercise 6
 */
function Euler1() {
    return range(1000).filter(
        element => !(element%3) || !(element%5)
        ).reduce(
            (accumulator, element) => element+accumulator,
            0
        )
}
/**
 * Exercise 7
 */
function infinite_series_calculator(accumulate, predicate, transform, n) {
    return predicate => transform => n => range(n).filter(predicate).map(transform).reduce(accumulate)
}
//function infinite_series_calculator(accumulate) {
//    return predicate => transform => n => range(n).filter(predicate).map(transform).reduce(accumulate)
//}
/**
 * Exercise 8
 */
function calculatePiTerm(n){
    return (4*(n**2))/(4*(n**2)-1)
}

function skipZero(num){
    return num? true : false
}

function productAccumulate(n, m){
    return n*m
}

function calculatePi(n){ //********* TODO (The person who did ex7 will understand how to do this as we have to use that function here, also I changed ex7 a bit as it has to accept 4 parameters)
    return
}

/**
 * Exercise 9
 */

/**
 * Exercise 10
 */
