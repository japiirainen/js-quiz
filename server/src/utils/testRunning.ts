import { runCLI } from 'jest'
import path from 'path'
import fs from 'fs/promises'

const projectRootPath = path.join(__dirname, '..', '..')

const jestConfig = {
   roots: ['./src/test'],
   testRegex: '\\.test\\.js$',
}

export const runTests = async () => {
   const results = await runCLI(jestConfig as any, [projectRootPath])
   if (results.results.success) {
      console.log(`Tests completed`)
   } else {
      console.error(`Tests failed`)
   }
}

const testSuitePath = path.join(__dirname, '..', '__test__', 'try.test.js')

const makeFileContent = (
   results: string[],
   expectations: number[],
   fn: (results: string[], expectations: number[]) => void
) => {
   const content = `const pairs = ${fn(results, expectations)}
test('test', () => {
   pairs.map(pair => expect(pair.result).toEqual(pair.expectation))
})
   `
   return content
}

export const writeTestSuite = async (
   results: string[],
   expectations: number[],
   fn: (results: string[], expectations: number[]) => void
) => {
   const content = makeFileContent(results, expectations, fn)
   const file = await fs.writeFile(testSuitePath, content)
   console.log(file)
}
