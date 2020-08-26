const multiplyByTwo = a => {
   return a * 2
}

test('should multiply by two', () => {
   const res = multiplyByTwo(5)
   expect(res).toEqual(10)
})
