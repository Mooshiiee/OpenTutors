import { Card, CardActionArea, Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'


export default function AppointmentCard ( {index, appointment, handleApptDialog} ) {
    
    dayjs.extend(utc)
    const formattedDateTime = (dateTimeString) => {
        const date = dayjs(dateTimeString)
        return (
            date.format('MMM D, h:mm A')
        )
    }

    const chipColorFromStatus = (status) => {
        if (status === 'scheduled') {
            return "success";
        }

        if (status === 'cancelled') {
            return "error";
        }

        if (status === 'completed') {
            return 'info';
        }

        return 'warning'
    }

    return (
        <Card key={index} elevation={0} sx={{ bgcolor: 'grey.200', borderRadius: 3, mb: 1 }}>
            <CardActionArea
                sx={{p: 1}} 
                onClick={() => handleApptDialog(appointment)}
            >
            <Grid container spacing={2} direction='row'>
                <Grid 
                item 
                container 
                direction='column' 
                justifyContent="center" 
                alignItems="flex-start"
                xs={7}  // Full width on extra small screens
                sm={7}   // 2/3 width on small screens and up
                md={8}   // 3/4 width on medium screens and up
                >
                    <Grid item>
                        <Stack 
                            direction={{ xs: 'column', sm: 'row' }} 
                            spacing={{ xs: 1, sm: 3 }}
                            sx={{ mt: 1 }}
                        >
                            <Typography fontWeight="bold" align='left' pl={1}>
                            {appointment.tutor_first_name} {appointment.tutor_last_name} 
                            </Typography>
                            <Chip 
                                label={appointment.status} 
                                color={chipColorFromStatus(appointment.status)}
                                size="small"
                            />
                        </Stack>
                    </Grid>
                    <Grid item>
                        <Stack 
                        direction={{ xs: 'column', sm: 'row' }} 
                        spacing={{ xs: 1, sm: 1 }}
                        sx={{ mt: 1 }}
                        >
                        <Chip 
                            label={appointment.subject} 
                            color='secondary'
                            size="small"
                        />
                        <Chip 
                            label={appointment.location ? appointment.location : 'Waiting on Location'} 
                            color={appointment.location ? 'success' : 'info'}
                            size="small"
                        />
                        </Stack>
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    container 
                    xs={5}  // Full width on extra small screens
                    sm={5}   // 1/3 width on small screens
                    md={4}   // 1/4 width on medium screens and up
                    justifyContent="center" 
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    sx={{ mt: { xs: 2, sm: 0 } }}  // Add margin top on extra small screens
                >
                <Typography variant='subtitle1'> 
                    {formattedDateTime(appointment.date_time)} 
                </Typography>
                </Grid>
            </Grid>
            </CardActionArea>
            </Card>
    )
}