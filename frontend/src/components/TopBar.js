import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider,createTheme } from '@mui/material';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {Link, useLocation} from 'react-router-dom'

import { useNavigate } from 'react-router-dom';

export default function TopBar({ toggleDrawer, userLoggedIn}) {

  const navigate = useNavigate()

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
      <Box sx={{ flexGrow: 1 }}>
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
            <IconButton component={Link} to='/home' color='inherit'>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1,
                textAlign: 'center'
              }}>
                OpenTutors
              </Typography>
            </IconButton>

            {!token ? (
              <IconButton edge='end' component={Link} to='/profile' color="inherit">
                <RocketLaunchRoundedIcon />
              </IconButton>
            ) : (
              <IconButton edge='end' component={Link} to='/login' color="inherit">
                <AccountCircleIcon />
              </IconButton>
            )}
            <IconButton edge='end'>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
