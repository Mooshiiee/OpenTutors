import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider,createTheme } from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {Link, useLocation} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

export default function TopBar({ toggleDrawer, userLoggedIn}) {

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#ffe4b5',
      },
      info: {
        main: '#f0e68c',
      },
      warning: {
        main: '#bc8fbc'
      }
    },
  });

  const [token, setToken] = React.useState(localStorage.getItem('token'))
  const location = useLocation(); //returns the current location within router

  React.useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [location] ) //useEffect will run whenever the location changes, hopefully...

  return (
    <ThemeProvider theme={darkTheme}>
      <Box >
        <AppBar position="static" color='info'>
          <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)} 
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{flexGrow: 1}}>
              <IconButton component={Link} to='/' color='inherit'>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1,
                  textAlign: 'center'
                }}>
                  OpenTutors
                </Typography>
              </IconButton>
            </div>

            {!token ? (
              <IconButton component={Link} to='/login' color="inherit">
                <RocketLaunchRoundedIcon />
              </IconButton>
            ) : (
              <IconButton component={Link} to='/profile' color="inherit">
                <AccountCircleIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
