const { testRunner, testsToFnCalls } = require('../utils/testRunnerOld.js')

// const maybeSolution = 'function multiplyByTwo(a) { return a * 2 }'

// const testCases = [
//    'const res = solution(5)\n expect(res).to.be.eq(10)',
//    'const res = solution(6)\n expect(res).to.be.eq(12)',
// ]

const maybeSolution = 'function sayHi(msg) { return msg }'

const testCases = [
   "const res = solution('Hey there!')\n expect(res).to.be.eq('Hey there!')",
   "const res = solution('Hello there!')\n expect(res).to.be.eq('Hello there!')",
]

const tests = testsToFnCalls(testCases)
const results = testRunner(maybeSolution, tests)
console.log(results)

// const res = eval(`
// const {expect} = require('chai');

// ${fn}

// const tests = ${testCases};

// //const results = testRunner(tests);

// const results = tests.map(t => {
//    try {
//       t();
//       return "pass";
//    } catch (e) {
//       return e;
//    }
// });

// results;

// `)
// console.log(res)
