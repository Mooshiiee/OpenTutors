import { Avatar, Box, Card, CardActions, Chip, IconButton, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { utc } from "dayjs/plugin/utc";

import CancelIcon from '@mui/icons-material/Cancel';
import ThreePIcon from '@mui/icons-material/ThreeP';

export default function NextSessionPaper ( {appointments} ) {

    const now = dayjs()

    const nextSession = appointments.reduce((closestAppt, currentAppt) => {
        //on first iteration, currentAppt is the first appointment in the JSON
        //and closestAppt is initialized as null

        //the date of the appointment being interated
        const currentDate = dayjs(currentAppt.date_time)

        if (currentDate.isBefore(now)) {
            return closestAppt
        }
        //if closestAppt still does not exist OR if currentAppt is-Before the closestAppt
        if ( !closestAppt || dayjs(currentAppt).isBefore(dayjs(closestAppt.date_time)) ) {
            return currentAppt
        }

        //if nothing else return closestAppt. Check if cloestAppt is still null before using it.
        return closestAppt; 
    })

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
                    <Typography>Markus Johnson</Typography>
                    <Typography variant="body2" color="text.secondary">AP History</Typography>
                </Box>
            </Box>

            <Box display="flex" px={2} pb={0} gap={2} >
                <Chip size="lg" label='Virtual' />
                <Chip size="lg" label='Microsoft Teams' />
            </Box>

            <CardActions disableSpacing sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton>
                        <ThreePIcon />
                    </IconButton>
                    <IconButton>
                        <CancelIcon />
                    </IconButton>
            </CardActions>

            </Card>
        </Paper>
    )
}