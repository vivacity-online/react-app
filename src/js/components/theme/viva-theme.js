import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

  palette: {
    primary: {
        main: '#9e63c3',//Purple
     }, 
    secondary: {
        main: '#e67a63',//Orange
     }, 
    success: {
        main: '#16ba64', //Green
    },
    black: {
      main: '#232323',
    },
    white: {
      main: '#f7f7f7',
      rgb: '247, 247, 247',
    },
    background: {
      paper: '#f7f7f7',
    }
  },
});

export default theme;