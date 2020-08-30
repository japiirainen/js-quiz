import React from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-merbivore'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-mono_industrial'
import 'ace-builds/src-noconflict/theme-pastel_on_dark'
import 'ace-builds/src-noconflict/theme-tomorrow'
interface EditorProps {
   height: string
   defaultValue: string
   theme: string
   value: string
   setValue: any
}

export const Editor: React.FC<EditorProps> = ({ height, defaultValue, theme, value, setValue }) => {
   function onChange(newValue: string) {
      setValue(newValue)
   }

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
         fontSize={16}
         showPrintMargin={true}
         showGutter={true}
         setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
         }}
      />
   )
}
