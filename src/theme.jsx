import {
  useTheme,
  createTheme
} from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export const useIsSmallScreen = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const useIsMediumScreen = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export const colorPalette = {
  amour: '#ffeaeb',
  aquaGreen: '#35A8501A',
  ashWhite: '#f6f6f7',
  azalea: '#FADADA',
  backgroundPurple: '#DFD3FF',
  black: '#000000',
  bloodRed: '#ce4242',
  blueRomance: '#DFF7D7',
  boxShadowDarkGrey: 'rgba(0,0,0, 0.32)',
  boxShadowGrey: '#0000001F',
  brightGray: '#E8ECF0',
  ceramic: '#FBFFF5',
  chilliPepper: '#C31A1A',
  cinnabar: '#EA3636',
  colonialWhite: '#FDEBD3',
  cosmicLatte: '#d5d5fa',
  danger: '#fbdada',
  darkGray: '#666666',
  darkGreen: '#008954',
  darkGrey: '#454F63',
  darkPastelPurple: '#906fde',
  pastelPurple: '#9181F4',
  darkPurple: '#5433AE',
  brightPurple: '#5038ED',
  darkShadowGrey: '#979fa8',
  deepViolet: '#642edd',
  dimBlack: '#333333',
  ebb: '#ebe1e1',
  explosiveGrey: '#c4c4c4',
  forestGreen: '#39B225',
  gold: '#FFD600',
  golden: '#DF8533',
  gray: '#808080',
  green: '#2d9f72',
  greenHaze: '#07A854',
  grey: '#7c7c7c',
  jungleGreen: '#2D9F72',
  lavenderGray: '#f0eef4',
  lavenderPurple: '#d6c7f8',
  lavenderMist: '#F6F4FB',
  lightBlack: '#404040',
  lightCyan: '#fbfaff',
  lightGreen: '#35A850',
  lightGrey: '#ededed',
  lightLavender: '#F3EFFF',
  lightPurple: '#ECE7F8',
  lightShadow: '#F8F9FA',
  lightShadowGrey: '#D3D3D3',
  linkWater: '#ECE7F9',
  magicMint: '#B1F4D4',
  magnolia: '#f9f1ff',
  malachite: '#01d057',
  maroon: '#800000',
  marzipan: '#F9D991',
  mediumGray: '#aaa',
  meteor: '#C77312',
  midnightHaze: '#454F63',
  midnightPurple: '#2A116D',
  mintCream: '#DBF1E5',
  mintGreen: '#DCFAE3CC',
  mintTulip: '#c7ebd5',
  mustard: '#C77312',
  nobel: '#b4b4b4',
  orangeBrown: '#b56a11',
  orangeYellow: '#f9d991',
  oxfordBlue: '#031f46',
  paleBlue: '#DBECFD',
  parrotGreen: '#4CAF50',
  pastelPink: '#FFCFDF',
  pink: '#ffe0e2',
  purple: '#632DDD',
  purpleBlue: '#6330E1',
  red: '#FF0000',
  roseWhite: '#FFFAFA',
  seaGreen: '#b1f4d4',
  selago: '#E6D9FC',
  shamrockGreen: '#009457',
  skin: '#FEEAD8',
  snowWhite: '#f9f9f9',
  snowyMint: '#d9ffe8',
  softGrey: '#eeeeee',
  softOrange: '#DD7750',
  softRed: '#FF4848',
  spanishGray: '#979494',
  steelBlue: '#577EBF',
  sugarCane: '#f9fff5',
  titaniumWhite: '#E4E4E4',
  torchRed: '#fe2536',
  transparent: 'transparent',
  tundora: '#4a4a4a',
  VenetianRed: '#EF6767',
  veryDarkGrey: '#404040',
  whisper: '#f0f0f0',
  white: '#ffffff',
  whiteSilver: '#ccc',
  semiBlack: '#0000001A'
};

const themeOptions = {
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 14,
    htmlFontSize: 16,
    body1: {
      lineHeight: 1.8
    }
  },
  breakpoints: {
    values: {
      xs: 650,
      sm: 800,
      md: 900,
      lg: 1100,
      xl: 1340
    }
  },
  palette: {
    primary: {
      main: '#632DDD'
    },
    secondary: {
      main: '#07A854'
    },
    third: {
      main: '#031F46'
    }
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        colorAction: {
          color: '#c4c4c4'
        }
      }
    }
  }
};

export const theme = createTheme(themeOptions);
