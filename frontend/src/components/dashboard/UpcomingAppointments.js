import React from 'react';
import { Typography, Box, Stack, Chip, Grid, Card, CardActionArea} from '@mui/material'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import AppointmentCard from './AppointmentCard';

//drilling down 'handleApptDialog' from Dashboard to AppointmentCard
export default function UpcomingAppointments ( {appointments, handleApptDialog} ) {
    const [viewAll, setViewAll] = React.useState(false)

    dayjs.extend(utc)
    dayjs.extend(isSameOrAfter)
    const formattedDateTime = (dateTimeString) => {
        const date = dayjs(dateTimeString)
        return (
            date.format('MMM D, h:mm A')
        )
    }



    //filter out 'appointments' into two seperate arrays
    const scheduledAppointments = appointments.filter(appointment => dayjs(appointment.date_time).isSameOrAfter(dayjs()))
    const otherAppointments = appointments.filter(appointment => dayjs(appointment.date_time).isBefore(dayjs())) 
    //could possibly use a single loop to do this faster 



    return (
        <>
        
        <Box 
            sx={{ 
                maxHeight: 300, 
                overflowY: !appointments ? 'auto' : 'scroll',
            }}
        >
            {scheduledAppointments.map((appointment, index) => (
                <AppointmentCard appointment={appointment} index={index} handleApptDialog={handleApptDialog} />
            ))}

            {viewAll ? (
                <>
                <Card 
                    sx={{ bgcolor: 'grey.200', borderRadius: 3, mb: 1 }}
                >
                    <CardActionArea
                        sx={{p: 1}} 
                        onClick={() => setViewAll(false)}
                    >
                        <Typography variant='h6'>
                            Hide Past Appointments
                        </Typography>
                    </CardActionArea>
                </Card>
                {otherAppointments.map((appointment, index) => (
                    <AppointmentCard appointment={appointment} index={index} handleApptDialog={handleApptDialog} markScheduledAsComplete={true} />
                ))}
                </>
            ) : (
                <Card 
                    sx={{ bgcolor: 'grey.200', borderRadius: 3, mb: 1 }}
                >
                    <CardActionArea
                        sx={{p: 1}} 
                        onClick={() => setViewAll(true)}
                    >
                        <Typography variant='h6'>
                            View All
                        </Typography>
                    </CardActionArea>
                </Card>
            )}

        </Box>

        {appointments.length === 0 && (
            <Box sx={{ p: 1, bgcolor: 'grey.200', borderRadius: 3, mb: 1 }}>
                <Typography>You have no upcoming appointments</Typography>
            </Box>
        )}
        </>
    )
}