import React, { useState } from 'react'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-merbivore'
import 'ace-builds/src-noconflict/theme-pastel_on_dark'
import 'ace-builds/src-noconflict/theme-mono_industrial'

interface EditorProps {
   height: string
   defaultValue: string
   theme: string
}

export const Editor: React.FC<EditorProps> = ({ height, defaultValue, theme }) => {
   const [value, setValue] = useState('')
   function onChange(newValue: string) {
      setValue(newValue)
   }
   console.log(value)

   return (
      <AceEditor
         mode="javascript"
         theme={theme}
         name="UNIQUE_ID_OF_DIV"
         onChange={onChange}
         editorProps={{ $blockScrolling: true }}
         defaultValue={defaultValue}
         value={value}
         width="100%"
         height={height}
      />
   )
}
