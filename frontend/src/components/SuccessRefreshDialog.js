import React from "react";

import { Box, Button, Collapse, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function SuccessRefreshDialog ( {successDialog, setSuccessDialog} ) {

    const handleClose = () => {
        setSuccessDialog(false)
        window.location.reload(); // This will refresh the page
    }

    return (

        <Dialog open={successDialog} onClose={handleClose}>

                <Box p={5} display="flex" alignItems="center" flexDirection='column' sx={{overflow: 'clip'}}>
                    <Typography variant="h4">
                        Action Completed
                    </Typography>
                    <Slide in={successDialog} appear direction="left">
                        <CheckCircleIcon color="primary" sx={{fontSize: 150, my: 5}} />
                    </Slide>
                    <Button variant="contained" color="secondary" fullWidth onClick={handleClose}>
                        okay... Thanks!
                    </Button>
                </Box>
        </Dialog>
    )
}