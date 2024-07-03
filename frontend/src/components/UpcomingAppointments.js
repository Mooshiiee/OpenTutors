import React from 'react';
import { Typography, Box, Stack, Chip, Divider} from '@mui/material'

export default function UpcomingAppointments() {
    return (
            <Box>
            <Box sx={{ p: 1, bgcolor: 'grey.100'}} >
                <Box
                sx={{display: 'flex', justifyContent: 'space-between', 
                    alignItems: 'center'}}
                >
                <Typography variant="subtitle1" fontWeight="bold">
                    John Doe
                </Typography>
                <Typography color="textSecondary" mx={2}>
                    Algerbra
                    </Typography>
                <Typography color="textSecondary">10:00 AM</Typography>
                </Box>
                <Stack direction="row" spacing={1} alignContent={'center'}>
                    <Chip size='small' label="In-Person" color="primary" />
                    <Typography color="textSecondary">Memorial Lbrary</Typography>
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 1, bgcolor: 'grey.100'}} >
                <Box
                sx={{display: 'flex', justifyContent: 'space-between', 
                    alignItems: 'center'}}
                >
                <Typography variant="subtitle1" fontWeight="bold">
                    John Doe
                </Typography>
                <Typography color="textSecondary" mx={2}>
                    Algerbra
                    </Typography>
                <Typography color="textSecondary">10:00 AM</Typography>
                </Box>
                <Stack direction="row" spacing={1} alignContent={'center'}>
                    <Chip size='small' label="In-Person" color="primary" />
                    <Typography color="textSecondary">Memorial Lbrary</Typography>
                </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 1, bgcolor: 'grey.100'}} >
                <Box
                sx={{display: 'flex', justifyContent: 'space-between', 
                    alignItems: 'center'}}
                >
                <Typography variant="subtitle1" fontWeight="bold">
                    John Doe
                </Typography>
                <Typography color="textSecondary" mx={2}>
                    Algerbra
                    </Typography>
                <Typography color="textSecondary">10:00 AM</Typography>
                </Box>
                <Stack direction="row" spacing={1} alignContent={'center'}>
                    <Chip size='small' label="In-Person" color="primary" />
                    <Typography color="textSecondary">Memorial Lbrary</Typography>
                </Stack>
            </Box>
            <Divider />
            </Box>
    )
}