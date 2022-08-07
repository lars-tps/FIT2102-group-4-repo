// Surname     | Firstname     | Contribution % | Any issues?
// =====================================================
// Person 1... | Pei Sheng     | 20%
// Person 2... | Mohamed Areeb | 20%
// Person 3... | Jing Wei      | 20%
// Person 4... | Swee Zao      | 20%
// Person 5... | Yu Mei        | 20%
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
function infinite_series_calculator(accumulate, initialAccumulatorValue=0) {
    return predicate => transform => n => range(n).filter(predicate).map(transform).reduce(accumulate, initialAccumulatorValue)
}

/**
 * Exercise 8
 */
const calculatePiTerm = n => (4*n*n)/((4*n*n)-1)
const skipZero = num => num > 0 || num < 0
const productAccumulate = (num1, num2) => num1 * num2
const calculatePi = n => infinite_series_calculator(productAccumulate, 2)(skipZero)(calculatePiTerm)(n)

const pi = calculatePi(100)

/**
 * Exercise 9
 */
function factorial(n){
    if (n==1){
        return n
    }
    return n*factorial(n-1)
}
const calculateETerm = n => ((2*(n+1))/(factorial((2*n)+1)))
const sumAccumulate = (num1, num2) => num1 + num2
const alwaysTrue = n => true
const sum_series_calculator = (transform) => (n) => infinite_series_calculator(sumAccumulate)(alwaysTrue)(transform)(n)
const calculateE = n => sum_series_calculator(calculateETerm)(n)
const e = calculateE(100)

/**
 * Exercise 10
 */
// function sin(x){
//     const calcNTerm = (n,x) => ((((-1)**n)*(x**((2*n)*1)))/(factorial((2*n)+1)))
//     return sum_series_calculator(calcNTerm, x)
// }

const calculateSinTerm = x => n => n%2 ? (-(1**n) * (x**(2*n+1)) / factorial(2*n+1)) : ((1**n) * (x**(2*n+1)) / factorial(2*n+1))
const sin = x => sum_series_calculator(calculateSinTerm(x))(100)
