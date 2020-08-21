import React, {useState} from 'react'
import {Grid} from '@chakra-ui/core'
import {Editor} from '../components/Editor'
import {SideDrawer} from '../components/SideDrawer'
import {Header} from '../components/Header'

export const LandingPage = () => {
  const [value, setValue] = useState()
  const defVal = `function myFunc(msg) {
       return msg
   }`

  return (
    <>
      <Header />
      <Grid templateColumns='repeat(2, 1fr)'>
        <SideDrawer />
        <Editor value={value} setValue={setValue} defVal={defVal} />
      </Grid>
    </>
  )
}
