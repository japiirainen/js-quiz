import React, { useState } from 'react'
import { Grid, Text, Flex } from '@chakra-ui/core'
import { Editor } from '../components/Editor'
import { SideDrawer } from '../components/SideDrawer'
import { Header } from '../components/Header'
import { QuestionDesc } from '../components/QuestionDesc'

export const BasicsPage = () => {
   const [value, setValue] = useState()
   const defVal = `function myFunc(msg) {
       return msg
   }`

   return (
      <>
         <Header />
         <Grid templateColumns="repeat(2, 1fr)">
            <SideDrawer />
            <Flex direction="column" justify="center" alignContent="center">
               <QuestionDesc />
               <Editor value={value} setValue={setValue} defVal={defVal} />
            </Flex>
         </Grid>
      </>
   )
}
