import { Typography ,Paper,Box, Container, Button, Card, CardActionArea, Avatar, CardContent} from '@mui/material';
import Grid from '@mui/material/Grid'
import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UpcomingAppointments from '../components/UpcomingAppointments';
import { Link } from 'react-router-dom';
/*
DASHBOARD will have:
-hello/editProfile/ if userExtraData (blog) else (finish setting up account)
-upcoming appointments
-Schedule new appointment
-View Tutors
-Submit essay for review
*/

function getLocalTokenPromise() {
    return new Promise((resolve, reject) => {
        try {
            const localToken = localStorage.getItem('token')
            resolve(localToken)
        } catch (error) {
            reject(error)
        }
    })
}

export default function Dashboard() {

    const [userData, setUserData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    //fetch HomeView when page loads 
    useEffect(() => {
        async function initAxiosWhenToken() {
            try {
            const token = await getLocalTokenPromise()
            const axiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:8000/api/',
                timeout: 1000,
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            const localUsername = localStorage.getItem('username')
            console.log(`dashboard/${localUsername}`)
            
            axiosInstance.get(`dashboard/${localUsername}`)
            .then(response => {
                setUserData(response.data)
            })
            .catch(error => {
                setErrorMsg(error)
                console.error(error)
            })
            
            } catch (error) {
                console.log(error)
            }      
        }

        if (userData.length === 0) {
            initAxiosWhenToken();
        }
    }, [userData] );

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
    

    return(
        <ThemeProvider theme={defaultTheme}>
        <Box sx={{ bgcolor: 'primary.main', my: 2}}>
            <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                        m: '4px'}}>
                        <Typography variant="h5">Hello {userData.first_name}!</Typography>
                        <Box my={1}>
                            <Button variant='contained' color='info' sx={{m: '8px'}}
                            component={Link} to='/profile'>
                                View Profile</Button>
                            {userData.lvl2complete ? (
                               <Button variant='contained' color='info' sx={{m: '8px',paddingX: '15%'}}
                               component={Link} to='/blog'>
                                Visit Blog</Button>
                            ) : (
                               <Button variant='contained' color='warning' sx={{m: '8px'}}
                               component={Link} to='/extra-signup'>
                                Finish Setting Up Account</Button>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={12} style={{ padding: '16px',textAlign: 'center',
                        margin: '4px' }}>
                        <Typography variant="h6" marginBottom={1}>Upcoming Sessions</Typography>
                        <Box sx={{ maxHeight: 150, overflowY: 'scroll'}}>
                            <UpcomingAppointments></UpcomingAppointments>
                        </Box>
                    </Paper> 
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={12} style={{ padding: '16px', textAlign: 'center', margin: '4px' }}>
                        <Typography variant="h6">Book a Session</Typography>
                        <Button variant="contained" color="primary" style={{ margin: '8px' }}>
                            Math
                        </Button>
                        <Button variant="contained" color="secondary" style={{ margin: '8px' }}>
                            Reading
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={12} style={{ padding: '16px', textAlign: 'center', margin: '4px' }}>
                        <Typography variant="h6">View Tutors</Typography>
                        <Box style={{ display: 'flex', overflowX: 'auto', padding: '16px' }}>
                            {[
                                { name: 'John Doe', description: 'Math Tutor', avatar: '/path/to/avatar1.jpg' },
                                { name: 'Jane Smith', description: 'Reading Tutor', avatar: '/path/to/avatar2.jpg' },
                                { name: 'Jane Smith', description: 'Reading Tutor', avatar: '/path/to/avatar2.jpg' },

                                // Add more tutors as needed
                            ].map((tutor, index) => (
                                <Card key={index} style={{ minWidth: 200, margin: '4px' }}>
                                    <CardActionArea>
                                        <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                                            <Grid container spacing={2}>
                                                <Grid item >
                                                        <Avatar src={tutor.avatar} sx={{ mx: '16px' }} />
                                                        <Typography variant="h6" sx={{w: '100%'}}>{tutor.name}</Typography>
                                                </Grid>
                                                <Grid item>                            
                                                <Typography variant="body2" color="textSecondary">
                                                    {tutor.description}Loves working on algerbra and geometry
                                                </Typography>
                                                </Grid> 
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

             <Typography>{JSON.stringify(userData, null, 2)}</Typography>
            {errorMsg && (
                    <pre>::error::{JSON.stringify(errorMsg, null, 2)}</pre>
                )}

            </Container>
        </Box>
        </ThemeProvider>

    )
}