import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import axios from 'axios';

const LogInFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%', // Ensure it takes the full width of the container
}));

export default function LogIn( setIsUserLoggedIn ) {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(''); // State for error message

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });



  const handleSubmit = (event) => {
    //prevents default submit handling
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //promise
    axiosInstance.post('auth/login/', {
      username: data.get('username'),
      password: data.get('password')
    })
      .then(response => {
        if (response.status === 200) {
          console.log(response.status)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.user.username)
          navigate('/dashboard')
        }
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage('The provided credentials are incorrect')
          }
        } else {
          setErrorMessage('An unexpected error has occured')
        }
      })
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: '#8fbc8f',
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
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LogInFormPaper elevation={24}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ my: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {errorMessage && (
                  <Typography color="error" variant="subtitle1">
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </LogInFormPaper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
