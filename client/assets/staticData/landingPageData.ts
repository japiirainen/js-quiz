export const infoCardsData = [
   {
      id: 1,
      main: 'Free JavaScript challenges',
      secondary: 'Learn through fun challenges',
   },
   {
      id: 2,
      main: 'Fun Progression',
      secondary: 'Gain points and level up',
   },
   {
      id: 3,
      main: 'Various programming topics',
      secondary: 'Topics used in many different programming languages',
   },
]

export interface LandingCarousel {
   id: number
   title: string
   exampleTitle?: string
   exampleCode?: string
   exampleSolutionTitle?: string
   exampleSolution?: string
}

export const landingCarouselData: LandingCarousel[] = [
   {
      id: 1,
      title: 'In the challenges you will always receive some input',
      exampleTitle: 'Examples of different inputs',
      exampleCode: `|>     1, 2\n|>    'hello', 'world'\n|>    [1, 2, 3]`,
   },
   {
      id: 2,
      title: 'You will also receive some expected outputs',
      exampleTitle: 'Sample outputs',
      exampleCode: `|>   1\n|>   'hello world'\n|>   [1, 2, 3]`,
   },
   {
      id: 3,
      title:
         'So youre challenge is to write a function that transforms the given inputs to equal the expected outputs!',
      exampleTitle: 'Example input and expected output',
      exampleCode: `input:\n|>   1, 2\noutput:\n|>    3`,
      exampleSolutionTitle: 'Example solution',
      exampleSolution: 'const add = (a, b) => a + b',
   },
   {
      id: 4,
      title: "So that's the gist of it! Click the link below to try it our for yourself",
   },
]
