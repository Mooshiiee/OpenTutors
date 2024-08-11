import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function TutorAvailabilityListItem ( {itemData, handleConfirmTimeslotDelete ,setSingleTimeslot} ) {

    dayjs.extend(customParseFormat)

    const formattedTime = (timeString) => {
        return dayjs(timeString, "HH:mm:ss").format("h:mm A")
    }

    const dayOfWeek = (integer) => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[integer]
    }

    const handleEdit = () => {
        setSingleTimeslot(itemData)
    }

    const handleDelete = () => {
        setSingleTimeslot(itemData)
        handleConfirmTimeslotDelete()
    }
    
    return (
    
    <Box sx={{ bgcolor: 'grey.200', borderRadius: 3, mb: 1 }}>
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
        >
            <Grid item>
                <Typography>{dayOfWeek(itemData.day)}</Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item>
                <Typography>{formattedTime(itemData.start_time)} - {formattedTime(itemData.end_time)}</Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid>
                <IconButton
                    onClick={handleDelete}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    onClick={handleEdit}
                >
                    <EditIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Box>
    )
}