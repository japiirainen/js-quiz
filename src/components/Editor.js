import React from 'react'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'

function onChange(newValue) {
  console.log('change', newValue)
}

export const Editor = () => {
  return (
    <AceEditor
      mode="javascript"
      theme="tomorrow"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  )
}
