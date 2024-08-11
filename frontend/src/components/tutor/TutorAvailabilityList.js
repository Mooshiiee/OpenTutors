import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";

import TutorAvailabilityListItem from "./TutorAvailabilityListItem";

import axiosInstance from "../../utils/axiosInstance";


export default function TutorAvailabilityList ( {timeslots, setConfirmDelete, singleTimeslot, setSingleTimeslot} ) {

    const handleConfirmTimeslotDelete = () => {
        setConfirmDelete(true)
    }
    

    return (
        <Box sx={{my:1}}>

            {timeslots.length === 0 && (
                <Box sx={{ bgcolor: 'grey.200', borderRadius: 3, mb: 1, p:1 }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography>You have no available time slots!</Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}


            {timeslots.map((timeslot, index) => (
                <TutorAvailabilityListItem
                    key={index} 
                    itemData={timeslot}
                    handleConfirmTimeslotDelete={handleConfirmTimeslotDelete}
                    setSingleTimeslot={setSingleTimeslot}
                    singleTimeslot={singleTimeslot}
                />
            ))}

        </Box>
    )
}