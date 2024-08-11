import React from "react";

import { Box, Button, Dialog, Divider, Grid, Slide, Typography } from "@mui/material";

import WavingHandIcon from '@mui/icons-material/WavingHand';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";


import axiosInstance from "../utils/axiosInstance";


export default function DeleteTimeslotConfirmationDialog ( {open, setOpen, data, fetchDashboardData}) {

    const dayOfWeek = (integer) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[integer]
    }

    dayjs.extend(customParseFormat)

    const formattedTime = (timeString) => {
        return dayjs(timeString, "HH:mm:ss").format("h:mm A")
    }

    const handleYes = () => {
        axiosInstance.delete(`delete-timeslot/${data.id}/`)
        .then(response => {
            if (response.status === 204) {
                setOpen(false)
                fetchDashboardData()
            }
            //window.location.reload(); // This will refresh the page
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handleNo = () => {
        setOpen(false)
    }


    return (
        <Dialog open={open} onClose={handleNo}>

                <Box p={5} display="flex" alignItems="center" flexDirection='column' sx={{overflow: 'clip'}}>
                    <Typography variant="h4">
                        Are you sure?
                    </Typography>
                    <Slide in={open} appear direction="left">
                        <WavingHandIcon color="success" sx={{fontSize: 150, my: 3}} />
                    </Slide>
                    <Typography sx={{my:1}}>
                        The timeslot that will be deleted:
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography>{dayOfWeek(data.day)}</Typography>
                        </Grid>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Grid item>
                            <Typography>{formattedTime(data.start_time)} - {formattedTime(data.end_time)}</Typography>
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        color="success" 
                        fullWidth 
                        onClick={handleNo}
                        sx={{my:2}}
                        endIcon={<UTurnLeftIcon />}
                    >
                        go back!
                    </Button>
                    <Button 
                        variant="contained" 
                        color="warning"
                        fullWidth 
                        onClick={handleYes}
                        endIcon={<LocalFireDepartmentIcon />}
                    >
                        yes please!
                    </Button>
                </Box>
        </Dialog>
    )
}