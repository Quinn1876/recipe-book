import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { DefaultTheme } from 'styled-components';

const bolds = {
  bold36: '700 36px Roboto',
  bold24: '700 24px Roboto',
  bold14: '700 14px Roboto',
  bold18: '700 18px Roboto',
};

const mediums = {
  medium12: '500 12px Roboto',
  medium14: '500 14px Roboto',
  medium18: '500 18px Roboto',
  medium24: '500 24px Roboto',
};

const borders = {
  solidGrey1: '1px solid #c4c4c4',
  solidGrey2: '0.75px solid rgba(214, 220, 227, 0.5)',
};

const shadow = {
  shadow1: '0 4px 4px 0px rgba(0, 0, 0, 0.25)',
  shadow2: '8px 8px 8px 0px rgba(0, 0, 0, 0.25)',
};


// https://coolors.co/222423-566246-cde7ce-fafcfc-8a8d91
export const theme: DefaultTheme = {
  palette: {
    primary: {
      main: '#566246', // Ebony Green
    },
    secondary: {
      main: '#CDE7CE',
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#222423', // Eerie Black
    },
    background: {
      default: '#CDE7CE',
      paper: '#FAFCFC',
    },
    grey: {
      500: '#8A8D91',
    },
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
      fontWeight: 150,
    },
    h6: {
      fontSize: 20,
      fontWeight: 500,
    },
    body1: {
      fontSize: 14,
    },
  },
  fonts: {
    ...mediums,
    ...bolds,
  },
  borders,
  shadow,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createMuiTheme(theme as any);

const renderTypographyVariants: (color?: colorType) => React.ReactElement = (
  color = 'inherit'
) => (
  <>
    <Typography variant="h3" color={color}>
      Typography Variants
    </Typography>
    <hr />
    <Typography variant="h1" color={color}>
      H1
    </Typography>
    <Typography variant="h2" color={color}>
      H2
    </Typography>
    <Typography variant="h3" color={color}>
      H3
    </Typography>
    <Typography variant="h4" color={color}>
      H4
    </Typography>
    <Typography variant="h5" color={color}>
      H5
    </Typography>
    <Typography variant="h6" color={color}>
      H6
    </Typography>
    <Typography variant="body1" color={color}>
      Body1
    </Typography>
    <Typography variant="body2" color={color}>
      Body2
    </Typography>
    <Typography variant="button" color={color}>
      Button
    </Typography>
    <br />
    <Typography variant="overline" color={color}>
      Overline
    </Typography>
    <br />
    <Typography variant="srOnly" color={color}>
      Hidden Text that only a Screen Reader can see
    </Typography>
    <Typography variant="subtitle1" color={color}>
      SubTitle1
    </Typography>
    <Typography variant="subtitle2" color={color}>
      SubTitle2
    </Typography>
    <Typography variant="caption" color={color}>
      Caption
    </Typography>
  </>
);

const colorPallete = (colors: string[]): React.ReactElement => (
  <div style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
    {colors.map(color => (
      <ColorBlock key={color} color={color} />
    ))}
  </div>
);

export const Theme = (): React.ReactElement => {
  return (
    <div>
      {renderTypographyVariants()}
      {renderTypographyVariants('primary')}
      <div style={{ backgroundColor: theme.palette.primary.main }}>
        {renderTypographyVariants('textSecondary')}
        {renderTypographyVariants('textPrimary')}
      </div>
      <div style={{ backgroundColor: theme.palette.background.default }}>
        {renderTypographyVariants('textSecondary')}
        {renderTypographyVariants('textPrimary')}
        {renderTypographyVariants('primary')}
      </div>
      <hr />
      <Typography variant="h3">Color Palette</Typography>
      {colorPallete(['#566246', '#CDE7CE', '#222423', '#FAFCFC'])}
    </div>
  );
};

const ColorBlock = ({ color }: { color: string }): React.ReactElement => (
  <div
    style={{
      width: 200,
      height: 200,
      backgroundColor: color,
      position: 'relative',
    }}
  />
);


type colorType =
  | 'primary'
  | 'secondary'
  | 'inherit'
  | 'initial'
  | 'textPrimary'
  | 'textSecondary'
  | 'error'
  | undefined;
