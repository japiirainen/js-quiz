import { createContext, Dispatch, SetStateAction, useState } from 'react'

export const ChallengeContext = createContext<{
   completedState: boolean
   setCompletedState: Dispatch<SetStateAction<boolean>> | any
}>({
   completedState: false,
   setCompletedState: null,
})

export const ChallengeContextProvider: React.FC = ({ children }) => {
   const [completedState, setCompletedState] = useState(false)
   return (
      <ChallengeContext.Provider value={{ completedState, setCompletedState }}>
         {children}
      </ChallengeContext.Provider>
   )
}
