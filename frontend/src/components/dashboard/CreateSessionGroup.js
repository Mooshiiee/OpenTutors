import * as React from 'react'
import { Paper, Button, Typography, Grid } from '@mui/material'


export default function CreateSessionGroup ({ userData }) {

return (

<Paper elevation={12} style={{ padding: '16px', textAlign: 'center', margin: '4px' }}>

    <Typography variant="h6">Book a Session</Typography>
    <Grid>
        <Grid item>
            <Button disabled={!userData.lvl2complete} variant="contained" color="primary" style={{ margin: '8px' }}>
                Math
            </Button>

            <Button disabled={!userData.lvl2complete} variant="contained" color="secondary" style={{ margin: '8px' }}>
                Reading
            </Button>
        </Grid>
        <Grid item>
            <Button disabled={!userData.lvl2complete} variant="contained" color="secondary" style={{ margin: '8px' }}>
                Essay Review
            </Button>
        </Grid>
    </Grid>



    {!userData.lvl2complete && (
        <Typography>Please Finish Setting Up Your Account</Typography>
    )}

</Paper>    

)}