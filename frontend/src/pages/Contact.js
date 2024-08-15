import { Box, Paper, TextField, Typography } from "@mui/material";


export default function Contact () {
    
    return (

    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        <Typography>
            Contact Form
        </Typography>

        <TextField
            id="name"
            label='name'
            
        />

        </Box>
    </Paper>
    </Box>

    )
}