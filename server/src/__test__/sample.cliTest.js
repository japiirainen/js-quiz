const { testRunner } = require('../utils/testRunner.js')

const fn = `function multiplyByTwo(a) {
   return a * 2
}`

const testCases = [
   `const res = solution(5)
   expect(res).to.be.eq(10)`,
   `const res = solution(6)
   expect(res).to.be.eq(12)`,
]

const tests = testCases.map(f => new Function('solution', 'expect', f))
const results = testRunner(fn, tests)
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
