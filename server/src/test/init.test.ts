const add = (a: number, b: number) => a + b

test('should add two numbers together', () => {
   expect(add(5, 5)).toEqual(10)
})
