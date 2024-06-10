import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider,createTheme } from '@mui/material';

import {Link} from 'react-router-dom'

export default function TopBar({ toggleDrawer }) {

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
            <Typography variant="h5" component="div" sx={{ flexGrow: 1,
              textAlign: 'center'
            }}>
              OpenTutors
            </Typography>
            <Button component={Link} to='/login'color="inherit">Log in</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
