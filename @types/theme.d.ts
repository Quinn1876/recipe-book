import 'styled-components';


declare module 'styled-components' {
  interface Typeface {
    fontSize: number;
    fontWeight: number;
  }

  export interface DefaultTheme {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      background: {
        default: string;
        paper: string;
      };
      grey: {
        500: string;
      };
    };
    typography: {
      fontFamily: string;
      h1: Typeface;
      h2: Typeface;
      h3: Typeface;
      h4: Typeface;
      h5: Typeface;
      h6: Typeface;
      body1: {
        fontSize: number;
      };
    };
    fonts: Record<string, string>;
    borders: Record<string, string>;
    shadow: Record<'shadow1' | 'shadow2', string>;
  }
}
