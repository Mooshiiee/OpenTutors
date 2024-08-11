import React from "react";

import { Box, Button, Collapse, Dialog, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, Slide, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import dayjs from "dayjs";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from "axios";

export default function AvailabilityAddDialog ( {open, setOpen, handleRefreshClose} ) {

    const [weekday, setWeekday] = React.useState('')
    const [startTime, setStartTime] = React.useState()
    const [endTime, setEndTime] = React.useState()

    const [errorMsg, setErrorMsg] = React.useState()

    const handleClose = () => {
        setOpen(false)
    }

    const formattedTime = (value) => {
        const str = value.format('HH:mm') 
        return str
    }

    const checkTimes = () => {
        if (endTime && startTime) {
            if (endTime.toString() === startTime.toString()) {
                return false
            }
            return (dayjs(startTime).isBefore(endTime))
        }
        return false
    }

    const submitCondition = () => {
        return !(weekday !== '' && startTime && endTime && checkTimes())
    }

    

    const handleSubmit = () => {

        const axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            timeout: 1000,
        });

        axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Token ${token}`
            }
            return config  
        })

        

        axiosInstance.post('add-timeslot', {
            day: weekday,
            end_time: formattedTime(endTime),
            start_time: formattedTime(startTime),
        })
        .then(response => {
            if (response.status === 201) {
                handleRefreshClose()
                
            }
        })
        .catch(error => {
            console.error(error)
            setErrorMsg('Sorry, there was an issue processing your request.')
        })


    }

    return (

        <Dialog 
            open={open} 
            onClose={handleClose}
        >

            <Box p={4} display="flex" alignItems="center" flexDirection='column' sx={{overflow: 'clip'}}>
                <Typography variant="h5">
                    Add an availability slot
                </Typography>
                <Typography variant="body2" sx={{mb:2}}>
                    Please keep slots to only one per day
                </Typography>

                <FormControl variant="standard" sx={{m:1, width: '90%'}}>
                    <InputLabel >Day of Week</InputLabel>
                    <Select
                        id="demo-simple-select"
                        label="Age"
                        value={weekday}
                        onChange={e => {
                            setWeekday(e.target.value)
                            console.log(e.target.value)
                        }}
                    >
                        <MenuItem value={0}>Sunday</MenuItem>
                        <MenuItem value={1}>Monday</MenuItem>
                        <MenuItem value={2}>Tuesday</MenuItem>
                        <MenuItem value={3}>Wednesday</MenuItem>
                        <MenuItem value={4}>Thursday</MenuItem>
                        <MenuItem value={5}>Friday</MenuItem>
                        <MenuItem value={6}>Saturday</MenuItem>
                    </Select>
                </FormControl>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker id="start-time" label="Start Time" 
                        onChange={value => {
                            setStartTime(value)
                        }}
                        sx={{m:1}}
                    />
                    <TimePicker id="end-time" label="End Time" 
                        onChange={value => {
                            setEndTime(value)
                        }}
                        sx={{m:1}}
                    />
                </LocalizationProvider>

                { endTime && startTime && !checkTimes() && (
                    <Typography sx={{ color: 'red' }}>
                        The Start Time must be before the End Time
                    </Typography>
                )}
                

                { errorMsg && (
                    <Typography sx={{ color: 'red' }}>
                        {errorMsg}
                    </Typography>
                )}


                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    onClick={handleSubmit}
                    endIcon={<CheckCircleIcon />}
                    disabled={submitCondition()}
                    sx={{m:1}}
                >
                    Submit Time Slot
                </Button>
            </Box>

        </Dialog>
    )
}