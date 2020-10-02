/* eslint-disable @typescript-eslint/ban-types */
import { createContext, useState } from 'react'
import { useMachine } from '@xstate/react'
import { Interpreter } from 'xstate'
import { CarouselContext, CarouselEvent, LPCarouselMachine } from '../machines/LPCarouselMachine'

export type serviceType = Interpreter<
   CarouselContext,
   any,
   CarouselEvent,
   {
      value: any
      context: CarouselContext
   }
>

export const LPMachineContext = createContext<{
   service: any
   setService: any
}>({
   service: null,
   setService: null,
})

export const LPMachineContextProvider: React.FC = ({ children }) => {
   const [, , _service] = useMachine(LPCarouselMachine)
   const [service, setService] = useState(_service)
   return (
      <LPMachineContext.Provider value={{ service, setService }}>
         {children}
      </LPMachineContext.Provider>
   )
}
