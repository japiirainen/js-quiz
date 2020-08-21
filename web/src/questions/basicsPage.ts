export const basicsPageChallenges = {
   q1: {
      defVal1: `function add(a, b) {}
 
    
add(2, 5)
 `,
      testCases1: `expect(add(2, 5)).toEqual(7)`,
      correctAnswer1: 7,
   },
   q2: {
      defVal2: `function concat(partOne, partTwo) {}
 
    
concat('This is a', 'great sentence.')
      `,
      testCases2: `expect(concat('This is a', 'great sentence.')).toEqual('This is a great sentence.')`,
      correctAnswer2: 'This is a great sentence.',
   },
}
