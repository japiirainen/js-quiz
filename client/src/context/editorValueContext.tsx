import { createContext, Dispatch, SetStateAction, useState } from 'react'

export const EditorValueContext = createContext<{
   value: string
   setValue: Dispatch<SetStateAction<boolean>> | any
}>({
   value: '',
   setValue: null,
})

export const EditorValueProvider: React.FC = ({ children }) => {
   const [value, setValue] = useState('')
   return (
      <EditorValueContext.Provider value={{ value, setValue }}>
         {children}
      </EditorValueContext.Provider>
   )
}
