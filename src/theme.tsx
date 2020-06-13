import React from 'react'
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";

// https://coolors.co/222423-566246-cde7ce-fafcfc-8a8d91
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#566246", // Ebony Green
    },
    secondary: {
      main: '#CDE7CE'
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#222423" // Eerie Black
    },
    background: {
      default: '#CDE7CE',
      paper: '#FAFCFC'
    },
    grey: {
      500: '#8A8D91'
    }
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontWeight: 400,
      fontSize: 90,
    },
    h2: {
      fontWeight: 350,
      fontSize: 60,
    },
    h3: {
      fontWeight: 400,
      fontSize: 40,
    },
    h4: {
      fontWeight: 250,
      fontSize: 35,
    },
    h5: {
      fontSize: 25,
      fontWeiht: 150,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
    }
  },

});

export default theme;

export const Theme = () => {
  return (
    <div>
      {renderTypographyVariants()}
      {renderTypographyVariants('primary')}
      <div style={{backgroundColor: theme.palette.primary.main}}>
        {renderTypographyVariants('textSecondary')}
        {renderTypographyVariants('textPrimary')}
      </div>
      <div style={{backgroundColor: theme.palette.background.default}}>
        {renderTypographyVariants('textSecondary')}
        {renderTypographyVariants('textPrimary')}
        {renderTypographyVariants('primary')}
      </div>
      <hr/>
      <Typography variant='h3'>
        Color Palette
      </Typography>
      {colorPallete(['#566246','#CDE7CE', '#222423', '#FAFCFC' ])}
    </div>
  )
}

const ColorBlock = ({color}: {color: string}) => (
  <div style={{width: 200, height: 200, backgroundColor: color, position: "relative"}}/>
)

const colorPallete = (colors: string[]) => (
  <div style={{display: 'inline-flex', flexWrap: "wrap"}}>
    {colors.map(color => <ColorBlock color={color} />)}
  </div>
)
type colorType = "primary" | "secondary" | "inherit" | "initial" | "textPrimary" | "textSecondary" | "error" | undefined
const renderTypographyVariants: (color?: colorType) => React.ReactElement = (color='inherit') => (
  <>
    <Typography variant="h3" color={color}>
      Typography Variants
    </Typography>
    <hr/>
    <Typography variant='h1' color={color}>
      H1
    </Typography>
    <Typography variant='h2' color={color}>
      H2
    </Typography>
    <Typography variant='h3' color={color}>
      H3
    </Typography>
    <Typography variant='h4' color={color}>
      H4
    </Typography>
    <Typography variant='h5' color={color}>
      H5
    </Typography>
    <Typography variant='h6' color={color}>
      H6
    </Typography>
    <Typography variant='body1' color={color}>
      Body1
    </Typography>
    <Typography variant='body2' color={color}>
      Body2
    </Typography>
    <Typography variant='button' color={color}>
      Button
    </Typography>
    <br/>
    <Typography variant='overline' color={color}>
      Overline
    </Typography>
    <br/>
    <Typography variant='srOnly' color={color}>
      Hidden Text that only a Screen Reader can see
    </Typography>
    <Typography variant='subtitle1' color={color}>
      SubTitle1
    </Typography>
    <Typography variant='subtitle2' color={color}>
      SubTitle2
    </Typography>
    <Typography variant='caption' color={color}>
      Caption
    </Typography>
  </>
)
