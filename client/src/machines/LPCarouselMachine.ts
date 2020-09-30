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
         }
      }
      done: {}
   }
}

type CarouselEvent =
   | { type: 'CLICK_START' }
   | { type: 'CLICK_NEXT' }
   | { type: 'CLICK_PREVIOUS' }
   | { type: 'CLICK_INTRO' }

interface CarouselContext {
   page: number
}

const setPageToOne = (ctx: CarouselContext) => assign({ page: ctx.page = 1 })
const incPage = (ctx: CarouselContext) => assign({ page: ctx.page += 1 })
const decPage = (ctx: CarouselContext) => assign({ page: ctx.page -= 1 })

export const LPCarouselMachine = Machine<CarouselContext, CarouselSchema, CarouselEvent>({
   initial: 'not_active',
   context: { page: 0 },
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
               },
            },
         },
      },
      done: {},
   },
})
