const add = (a: number, b: number) => a + b

test('should test function from index page', () => {
   expect(add(2, 4)).toEqual(6)
})

export {}
