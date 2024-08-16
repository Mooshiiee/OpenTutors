import { Avatar, Box, Card, CardActions, Chip, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import AssignmentIcon from '@mui/icons-material/Assignment';

export default function NextSessionPaper (  {handleApptDialog, appointments} ) {

    dayjs.extend(utc)

    const formattedDate = (utcString) => {
        const dateTimeObject = dayjs(utcString)
        return dateTimeObject.format('MMM D, h:mmA')
    }

    const today = dayjs()

    const nextSession = appointments.reduce((closest, appointment) => {        
        // Filter out appointments that are not scheduled or before today
        if (appointment.status !== 'scheduled' || dayjs(appointment.date_time).isBefore(today)) {
            return closest;
        }
        
        // If closestAppt is null or currentDate is-Before the current closest
        if ( !closest || dayjs(appointment.date_time).isBefore(dayjs(closest.date_time)) ) {
            return appointment;
        }
    
        return closest;
    }, null);

    const handleClick = () => {
        handleApptDialog(nextSession)
    }

    return (
        <Paper 
            elevation={12} 
            sx={{ padding: '16px', textAlign: 'center', m: '4px', height:'190px'}}
        >
            <Typography variant="h6">Next Session</Typography>
            <Card elevation={0} sx={{ bgcolor: 'grey.200', borderRadius: 3, mb: 1 }}>

            <Box display="flex" p={2} gap={2} flexWrap="nowrap">
                <Avatar />
                <Box display='flex' flexDirection='column' flexGrow={1} alignItems='start'>
                    <Typography>{nextSession.tutor_first_name} {nextSession.tutor_first_name}</Typography>
                    <Typography variant="body2" color="text.secondary">{nextSession.subject}</Typography>
                </Box>
            </Box>

            <Box display="flex" px={2} pb={0} gap={1} >
                <Chip size="lg" label='Virtual' />
                <Chip size="lg" label='Microsoft Teams' />
                <Chip size="lg" label={nextSession.status} />

            </Box>

            <CardActions sx={{display: 'flex', justifyContent: 'space-between', pt:0}}>

                <Typography pl={1.5}>
                    {formattedDate(nextSession.date_time)}
                </Typography>


                <Tooltip title="Appointment Details" arrow>
                    <IconButton onClick={handleClick}>
                        <AssignmentIcon/>
                    </IconButton>
                </Tooltip>
                    
            </CardActions>

            </Card>
        </Paper>
    )
}