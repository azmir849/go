import React from 'react'
import AppHeader from '../components/AppHeader'
import Loader from '../components/Loader'
import { Grid } from '@mui/material'

const HomePage = () =>{

  return (
    <> 
     {/* <Loader /> */}
     <Grid container spacing={2}>
          <Grid item lg={4} md={4} >
              left side bar
           </Grid>
          <Grid item lg={8} md={8} > 
            <div className="content_body">
              body content
            </div>
          </Grid>
      </Grid>
   </> 
  )
}
export default HomePage