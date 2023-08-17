import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      disableElevation: true,
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiRadio: {
      color: 'primary',
    }
  },
  palette: {
    mode: 'dark',
    common: {
      black: '#000000',
      white: '#ffff',
    },
    primary: {
      main: '#ffee0a',
    },
    secondary: {
      main: '#0083ff',
    },
    divider: 'rgba(255,255,255,0.42)',
    background: {
      paper: '#000000',
      default: '#000000'
    }
  },
})

export default theme;