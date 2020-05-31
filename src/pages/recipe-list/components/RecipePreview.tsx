import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {}
}))

const RecipePreview = () => {
  const classes = useStyles();
  return (
    <Paper classes={{
      root: classes.root
    }}>

    </Paper>
  )
}

export default RecipePreview
