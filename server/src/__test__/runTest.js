const { runCLI } = require('jest')
const path = require('path')

const projectRootPath = path.join(__dirname, '..', '..')

const jestConfig = {
   roots: ['./src/__test__'],
   testRegex: '\\.cliTest\\.js$',
}

const runTests = async () => {
   const results = await runCLI(jestConfig, [projectRootPath])
   console.log(JSON.stringify(results, null, 2))
   if (results.results.success) {
      console.log(`Tests completed`)
   } else {
      console.error(`Tests failed`)
   }
}
runTests()
