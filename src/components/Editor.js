import React from 'react'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'

export const Editor = ({ value, defVal, setValue }) => {
   const onChange = newValue => setValue(value)

   return (
      <AceEditor
         mode="javascript"
         theme="tomorrow"
         onChange={onChange}
         name="UNIQUE_ID_OF_DIV"
         editorProps={{ $blockScrolling: true }}
         value={value}
         defaultValue={defVal}
      />
   )
}
