import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

// Styled Paper component for the form
const SignUpFormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%', // Ensure it takes the full width of the container
}));
  
  export default function SignUp() {

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = React.useState({username: '', password: '', non_field_errors: '' ,other: ''})

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      axios.post('http://127.0.0.1:8000/api/create-user/', {
          first_name: data.get('firstName'),
          last_name: data.get('lastName'),
          email: data.get('email'),
          username: data.get('username'),
          password: data.get('password')
      })  
        .then(response => {
          if (response.status === 201) {
            navigate('/login')
          } 
        })
        .catch(error => {
          if (error.response.status === 400 && error.response.data) {
            const errorData = error.response.data
            setErrorMsg({
              //if errorData.username exists, set 'username' to index 0
              //of errorData.username (its a list), else set it to empty str
              username: errorData.username ? errorData.username[0] : '',
              password: errorData.password ? errorData.password[0] : '',
              non_field_errors: errorData.non_field_errors ? errorData.non_field_errors[0] : '',
            })
          } else {
            setErrorMsg({other: 'An unexpected error has occured'})
          }
        })

      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
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
      <Box sx={{ bgcolor: 'primary.main', minHeight: '100vh' }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <SignUpFormPaper elevation={24}>
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
                  Sign up
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      error={Boolean(errorMsg.username)}
                    />
                  </Grid>
                  { errorMsg.username ? <Typography sx={{mx: 5}} color='red'>{errorMsg.username}</Typography> : '' }
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={Boolean(errorMsg.password)}
                      placeholder={errorMsg.password}
                    />
                  </Grid>
                  <Typography mx={5} color='red'>{errorMsg.password}</Typography>

                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>

                {errorMsg.other && (
                  <Typography>{errorMsg.other}</Typography>
                )}

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </SignUpFormPaper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
