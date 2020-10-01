/* eslint-disable @typescript-eslint/ban-types */
import { Machine, assign } from 'xstate'

interface CarouselSchema {
   states: {
      not_active: {}
      active: {
         states: {
            p_1: {}
            p_2: {}
            p_3: {}
            p_4: {}
            p_5: {}
            intro: {
               states: {
                  solving: {}
                  registering: {
                     states: {
                        in_progress: {}
                        logged_in: {}
                        flow_end: {}
                     }
                  }
               }
            }
         }
      }
   }
}

type CarouselEvent =
   | { type: 'CLICK_START' }
   | { type: 'CLICK_NEXT' }
   | { type: 'CLICK_PREVIOUS' }
   | { type: 'CLICK_INTRO' }
   | { type: 'INTRO_SUCCESS'; solution: string }
   | { type: 'LOGIN_SUCCESS' }
   | { type: 'LOGIN_FAILED' }

interface CarouselContext {
   page: number
   solution: string | null
}
type setSolutionEvent = { solution: string }

const setPageToOne = (ctx: CarouselContext) => assign({ page: ctx.page = 1 })
const incPage = (ctx: CarouselContext) => assign({ page: ctx.page += 1 })
const decPage = (ctx: CarouselContext) => assign({ page: ctx.page -= 1 })
const setSolution = (_: CarouselContext, e: setSolutionEvent) =>
   assign({ page: 0, solution: e.solution })

export const LPCarouselMachine = Machine<CarouselContext, CarouselSchema, CarouselEvent>({
   initial: 'not_active',
   context: { page: 0, solution: null },
   states: {
      not_active: {
         on: {
            CLICK_START: {
               actions: setPageToOne,
               target: 'active.p_1',
            },
         },
      },
      active: {
         states: {
            p_1: {
               on: {
                  CLICK_NEXT: {
                     actions: incPage,
                     target: 'p_2',
                  },
               },
            },
            p_2: {
               on: {
                  CLICK_NEXT: {
                     actions: incPage,
                     target: 'p_3',
                  },
                  CLICK_PREVIOUS: {
                     actions: decPage,
                     target: 'p_1',
                  },
               },
            },
            p_3: {
               on: {
                  CLICK_NEXT: {
                     actions: incPage,
                     target: 'p_4',
                  },
                  CLICK_PREVIOUS: {
                     actions: decPage,
                     target: 'p_2',
                  },
               },
            },
            p_4: {
               on: {
                  CLICK_PREVIOUS: {
                     actions: decPage,
                     target: 'p_3',
                  },
                  CLICK_NEXT: {
                     actions: incPage,
                     target: 'p_5',
                  },
               },
            },
            p_5: {
               on: {
                  CLICK_PREVIOUS: {
                     actions: decPage,
                     target: 'p_4',
                  },
                  CLICK_INTRO: {
                     target: 'intro.solving',
                  },
               },
            },
            intro: {
               states: {
                  solving: {
                     on: {
                        INTRO_SUCCESS: {
                           actions: setSolution,
                           target: 'registering.in_progress',
                        },
                     },
                  },
                  registering: {
                     states: {
                        in_progress: {
                           on: {
                              LOGIN_SUCCESS: {
                                 target: 'logged_in',
                              },
                              LOGIN_FAILED: {
                                 target: 'flow_end',
                              },
                           },
                        },
                        logged_in: {},
                        flow_end: {},
                     },
                  },
               },
            },
         },
      },
   },
})
