import { createContext, useState } from 'react'

//@ts-ignore
export const ChallengeContext = createContext()

export const ChallengeContextProvider: React.FC = ({ children }) => {
   const [completedState, setCompletedState] = useState(false)
   return (
      <ChallengeContext.Provider value={{ completedState, setCompletedState }}>
         {children}
      </ChallengeContext.Provider>
   )
}
