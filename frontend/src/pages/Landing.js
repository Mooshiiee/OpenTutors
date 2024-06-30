import React from 'react';
import { Container, Typography, createTheme, ThemeProvider, Box } from '@mui/material';
import LandingButtons from '../components/LandingButtons';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8fbc8f',
      olive: '#808000',
    },
    secondary: {
      main: '#ffe4b5',
    },
    info: {
      main: '#f0e68c',
    }
  },
});

export default function Landing() {

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Container sx={{ bgcolor: 'primary.main', }} >
          <Box sx={{my: 20}}>
              <Typography variant="h2" align="center" gutterBottom >
                  Welcome to OpenTutors
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                  Free Tutoring Services for the New Haven Area
              </Typography>
          </Box>
            <LandingButtons />
            <Typography align="center" variant='h5' sx={{my: 10}}>
                Ut deserunt reprehenderit id consectetur pariatur pariatur. Occaecat anim proident exercitation aliqua nulla ipsum eiusmod dolor ad voluptate labore dolor elit cupidatat. Minim eiusmod reprehenderit culpa excepteur nostrud. Do incididunt pariatur culpa laboris elit ad esse magna cupidatat irure excepteur officia eiusmod deserunt. Duis est duis ipsum minim proident. Elit pariatur deserunt ad ut tempor irure exercitation.
            </Typography>
        </Container>
    </Box>
    </ThemeProvider>
  );
};

