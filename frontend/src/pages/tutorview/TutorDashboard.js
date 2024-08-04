import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, Container, Grid, Paper, Typography, Button } from "@mui/material";

import axios from "axios";

import TutorAppointmentDialog from "../../components/dashboard/TutorAppointmentDialog";
import TutorUpcomingAppointments from "../../components/tutor/TutorUpcomingAppointments";

export default function TutorDashboard () {
    const [appointments, setAppointments] = React.useState([])
    const [apptDialogData, setApptDialogData] = React.useState(false)
    const [apptDialogOpen, setApptDialogOpen] = React.useState()


    function getTokenAsync() {
        return new Promise((resolve) => {
          const token = localStorage.getItem('token');
          resolve(token);
        });
    }

    const handleApptDialog = (appointment, markScheduledAsPostSubmission) => {
        setApptDialogData(appointment)
        setApptDialogOpen(true)
        console.log('handleApptDialog ran')
        console.log(apptDialogData)
        console.log(apptDialogOpen)

    }
    
    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 1000,
    });

    axiosInstance.interceptors.request.use(async (config) => {
        const token = await getTokenAsync()
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        return config
    })

    useEffect( () => {
        axiosInstance.get('/tutor-dashboard')
        .then(response => {
            if (response.status === 200) {
                setAppointments(response.data.appointments)
                console.log(response)
            }
        })
        .catch(error => {
            console.error(error)
        })
    }, [])



    const defaultTheme = createTheme({
        palette: {
          primary: {
            main: '#6495ed',
          },
          secondary: {
            main: '#ffa07a',
          },
          info: {
            main: '#ffe37a',
          }
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ bgcolor: 'primary.main', my: 2}}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                            m: '4px'}}>
                                <Typography variant="h5"> Tutor Dashboard</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                                   m: '4px'}}
                            >
                                <Button variant="contained" color="secondary"
                                        sx={{m:1}}
                                >
                                    Edit Profile
                                </Button>
                                <Button variant="contained" color="primary"
                                        sx={{m:1}}
                                >
                                    View Blog
                                </Button>
                                <Button variant="contained" color="info"
                                        sx={{m:1}}
                                >
                                    Create a Blog Post 
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                                   m: '4px'}}
                            >
                                <Typography variant="h5" mb={1}> Upcoming Appointments</Typography>
                                <TutorUpcomingAppointments appointments={appointments} handleApptDialog={handleApptDialog} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                                    m: '4px'}}
                            >
                                <Typography variant="h5">Your Time Slots</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <TutorAppointmentDialog
                apptDialogData={apptDialogData}
                apptDialogOpen={apptDialogOpen}
                setApptDialogOpen={setApptDialogOpen}


            />

        </ThemeProvider>
    )
}



