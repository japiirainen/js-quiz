/* eslint-disable @typescript-eslint/ban-types */
import { Machine } from 'xstate'

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
   | { type: 'CLICK_LOGIN' }

interface CarouselContext {
   elapsed: number
}

export const LPCarouselMachine = Machine<CarouselContext, CarouselSchema, CarouselEvent>({
   initial: 'not_active',
   context: { elapsed: 0 },
   states: {
      not_active: {
         on: {
            CLICK_START: {
               target: 'active.page_1',
            },
         },
      },
      active: {
         states: {
            p_1: {},
            p_2: {},
            p_3: {},
            p_4: {},
         },
      },
      done: {},
   },
})
