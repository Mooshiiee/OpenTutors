import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';

import RocketRoundedIcon from '@mui/icons-material/RocketRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';

export default function LandingButtons() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& > *': {
          m: 1,
        },
        justifyContent: 'center'
      }}
    >

        <Button variant="contained" color="info" size="large"
        component={Link} to='/signup' startIcon={<RocketRoundedIcon />} >
            Sign Up
        </Button> 
        <p />
        <Button variant="contained" color="secondary" size="large"
        component={Link} to='/login' startIcon={<RocketLaunchRoundedIcon />}>
            Log In
        </Button>

    </Box>
  );
}