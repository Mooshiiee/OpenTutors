import {Typography ,Paper,Box, Container, Button,  CircularProgress, Stack} from '@mui/material';
import Grid from '@mui/material/Grid'
import React, { useEffect, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';

import CreateSessionGroup from '../components/dashboard/CreateSessionGroup';
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments';
import ListTutorsDashboard from '../components/dashboard/ListTutorsDashboard';
import AppointmentDialog from '../components/dashboard/AppointmentDialog';
import NextSessionPaper from '../components/dashboard/NextSessionPaper';

import GradientBackground from '../components/GradientBackground';

import axiosInstance from '../utils/axiosInstance';

/*
DASHBOARD will have:
-hello/editProfile/ if userExtraData (blog) else (finish setting up account)
-upcoming appointments
-Schedule new appointment
-View Tutors
-Submit essay for review
*/




export default function Dashboard() {

    const [userData, setUserData] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [dashboardData, setDashboardData] = useState([])

    //the data and open condition for appointment dialog
    const [apptDialogData, setApptDialogData] = useState(false)
    const [apptDialogOpen, setApptDialogOpen] = useState()

    const navigate = useNavigate()

    const handleApptDialog = (appointment) => {
        setApptDialogData(appointment)
        setApptDialogOpen(true)
    }

    const dashboardFetch = () => {
        axiosInstance.get('dashboard/')
        .then(response => {
            setDashboardData(response.data)
        })
        .catch(error => {
            if (error.response.status === 401) {
            navigate('/login')
            }
        })
    }

    //fetch HomeView when page loads 
    useEffect(() => {
        dashboardFetch()
    }, [] );

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
            light: '#99ccff',
          },
          error: {
            main: '#ff817b'
          },
          warning: {
            main: '#ffd247'
          }

        },
    });
    
    const isMdUp = useMediaQuery(defaultThemetheme => defaultTheme.breakpoints.up('md'))

    return(
        <ThemeProvider theme={defaultTheme}>
        {dashboardData.length === 0 ? (
            <GradientBackground sx={{
                bgcolor: '#8fbc8f',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <CircularProgress sx={{color: "#ffe4b5"}}/>
            </GradientBackground>
        ) : (
        <GradientBackground sx={{ my: 2,}}>
            <Container>
            <Grid container spacing={2} sx={{pt:2}}>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                        m: '4px', height:'190px'}}>
                        <Typography variant="h5">Hello {dashboardData.user.first_name}!</Typography>
                        <Box my={1}>
                            <Stack>
                            <Button variant='contained' color='info' sx={{m: '8px'}}
                            component={Link} to='/profile'>
                                View Profile</Button>
                            {dashboardData.user.userprofile.lvl2complete ? (
                               <Button variant='contained' color='info' sx={{m: '8px',paddingX: '9%'}}
                               component={Link} to='/blog'>
                                Visit Blog</Button>
                            ) : (
                               <Button variant='contained' color='warning' sx={{m: '8px'}}
                               component={Link} to='/extra-signup'>
                                Finish Setting Up Account</Button>
                            )}
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={4}>
                    <CreateSessionGroup lvl2complete={dashboardData.user.userprofile.lvl2complete} />
                </Grid>

                {isMdUp && (
                    <Grid item md={6} lg={4} >
                        <NextSessionPaper 
                            appointments={dashboardData.appointments} 
                            handleApptDialog={handleApptDialog} 
                        />
                    </Grid>
                )}

                {!isMdUp && (
                    <Grid item xs={12} sm={12}>
                        <NextSessionPaper 
                            appointments={dashboardData.appointments} 
                            handleApptDialog={handleApptDialog}
                        />
                    </Grid>
                )}

                <Grid item xs={12} sm={12} md={6}>
                    <Paper elevation={12} style={{ padding: '16px',textAlign: 'center',
                        margin: '4px' }}>
                        <Typography variant="h6" marginBottom={1}>Upcoming Sessions</Typography>
                        <UpcomingAppointments appointments={dashboardData.appointments} handleApptDialog={handleApptDialog} />
                    </Paper> 
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                    <Paper elevation={12} style={{ padding: '16px', textAlign: 'center', margin: '4px' }}>

                        <Typography variant="h6">View Tutors</Typography>

                        <ListTutorsDashboard tutors={dashboardData.tutors} />

                    </Paper>
                </Grid>
            </Grid>

             <Typography>{JSON.stringify(userData, null, 2)}</Typography>
{/* 
            {dashboardData && (
                    <pre>::dashboard2::{JSON.stringify(dashboardData, null, 2)}</pre>
                )} */}
            
            {errorMsg && (
                    <pre>::error::{JSON.stringify(errorMsg, null, 2)}</pre>
                )}

            <AppointmentDialog 
                apptDialogData={apptDialogData}
                apptDialogOpen={apptDialogOpen}
                setApptDialogOpen={setApptDialogOpen}
            />

            </Container>
        </GradientBackground>
        )}
        </ThemeProvider>
        

    )
}