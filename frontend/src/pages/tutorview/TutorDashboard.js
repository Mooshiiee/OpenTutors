import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, Container, Grid, Paper, Typography, Button } from "@mui/material";

import TutorAppointmentDialog from "../../components/dashboard/TutorAppointmentDialog";
import TutorUpcomingAppointments from "../../components/tutor/TutorUpcomingAppointments";
import SuccessRefreshDialog from "../../components/SuccessRefreshDialog";
import TutorAvailabilityList from "../../components/tutor/TutorAvailabilityList";
import AvailabilityAddDialog from "../../components/tutor/AvailabilityAddDialog";
import DeleteTimeslotConfirmationDialog from "../../components/DeleteTimeslotConfirmationDialog";

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import axiosInstance from "../../utils/axiosInstance";

export default function TutorDashboard () {
    const [appointments, setAppointments] = React.useState([])
    const [apptDialogData, setApptDialogData] = React.useState(false)
    const [apptDialogOpen, setApptDialogOpen] = React.useState()

    //the open condition of success dialog
    const [successDialog, setSuccessDialog] = React.useState(false)

    //the open condition of add-availability dialog
    const [timeSlotDialog, setTimeSlotDialog] = React.useState(false)
    //the currently selected timeslot
    const [singleTimeslot, setSingleTimeslot] = React.useState([])
    //the list of timeslots
    const [timeslots, setTimeslots] = React.useState([])

    //the open condition of timeslot confirm delete dialog
    const [confirmDelete, setConfirmDelete] = React.useState(false)

    const handleClose = (refresh) => {
        setApptDialogOpen(false);
    };

    const handleRefreshClose = () => {
        setApptDialogOpen(false)
        setTimeSlotDialog(false)
        fetchDashboardData()
        //window.location.reload(); // This will refresh the page, not needed anymore
    }

    const handleApptDialog = (appointment) => {
        //if (markScheduledAsPostSubmission) {}
        setApptDialogData(appointment)
        setApptDialogOpen(true)
        console.log('handleApptDialog ran')
        console.log(apptDialogData)
        console.log(apptDialogOpen)

    }
    
    // const axiosInstance = axios.create({
    //     baseURL: 'http://127.0.0.1:8000/api/',
    //     timeout: 1000,
    // });

    // axiosInstance.interceptors.request.use(async (config) => {
    //     const token = await getTokenAsync()
    //     if (token) {
    //         config.headers.Authorization = `Token ${token}`
    //     }
    //     return config
    // })

    const fetchDashboardData = () => {
        axiosInstance.get('/tutor-dashboard')
        .then(response => {
            if (response.status === 200) {
                setAppointments(response.data.appointments)
                setTimeslots(response.data.timeslots)

                console.log(response)
            }
        })
        .catch(error => {
            console.error(error)
        })
    }


    useEffect( () => {
        fetchDashboardData()
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
          },
          warning: {
            main: '#F05457'
          },
          success: {
            main: '#99cc99'
          },
          error: {
            main: '#E96E88'
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
                                <Typography 
                                    variant="h5"
                                    gutterBottom
                                > 
                                    Tutor Dashboard
                                </Typography>
                                <Button variant="contained" color="secondary"
                                        sx={{my:1}}
                                >
                                    Edit Profile
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                                   m: '4px'}}
                            >
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
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                                   m: '4px'}}
                            >
                                <Typography variant="h5" mb={1}> Upcoming Appointments</Typography>
                                <TutorUpcomingAppointments appointments={appointments} handleApptDialog={handleApptDialog} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                                    m: '4px'}}
                            >
                                <Typography variant="h5">Your Time Slots</Typography>
                                <Button
                                    variant="contained"
                                    endIcon={<ControlPointIcon />}
                                    color="secondary"
                                    sx={{m: 1}}
                                    onClick={() => setTimeSlotDialog(true)}
                                >
                                    Add a time slot 
                                </Button>
                                <Button
                                    variant="contained"
                                    endIcon={<FlightTakeoffIcon />}
                                    color="info"
                                    sx={{m: 1}}
                                >
                                    Toggle Break
                                </Button>

                                <TutorAvailabilityList 
                                    timeslots={timeslots} 
                                    setConfirmDelete={setConfirmDelete}
                                    singleTimeslot={singleTimeslot} 
                                    setSingleTimeslot={setSingleTimeslot}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <TutorAppointmentDialog
                apptDialogData={apptDialogData}
                apptDialogOpen={apptDialogOpen}
                setApptDialogOpen={setApptDialogOpen}
                handleClose={handleClose}
                handleRefreshClose={handleRefreshClose}
            />

            <SuccessRefreshDialog
                successDialog={successDialog}
                setSuccessDialog={setSuccessDialog}
            />

            <AvailabilityAddDialog 
                open={timeSlotDialog}
                setOpen={setTimeSlotDialog}
                handleRefreshClose={handleRefreshClose}
            />
            
            <DeleteTimeslotConfirmationDialog
                open={confirmDelete}
                setOpen={setConfirmDelete}
                data={singleTimeslot}
                fetchDashboardData={fetchDashboardData}
            />

        </ThemeProvider>
    )
}



