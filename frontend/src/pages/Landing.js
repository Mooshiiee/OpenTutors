import React from 'react';
import { Container, Typography, createTheme, ThemeProvider, Box, Paper } from '@mui/material';
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
          <Box sx={{my: 10}}>
              <Typography variant="h2" align="center" gutterBottom >
                  Welcome to OpenTutors
              </Typography>
              <Typography variant="h5" align="center" gutterBottom>
                  Free Tutoring Services for the New Haven Area
              </Typography>
          </Box>
            <LandingButtons />
            <Paper elevation={12} sx={{ p: 3, my: 10 }}>
              <Typography variant="h4" gutterBottom align='center'>
                Our Mission
              </Typography>
              <Typography variant="h5" paragraph>
                Open Tutors provides free, accessible tutoring to public school students. We believe every student deserves quality educational support, regardless of their background.
              </Typography>
              <Typography variant="h5">
                By connecting passionate tutors with eager learners, we aim to bridge the educational gap and empower students to reach their full potential.
              </Typography>
            </Paper>
        </Container>
    </Box>
    </ThemeProvider>
  );
};

