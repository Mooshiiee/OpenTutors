import * as React from 'react'
import { Paper, Button, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'


export default function CreateSessionGroup ({ lvl2complete }) {

    return (
    <Paper elevation={12} style={{ padding: '16px', textAlign: 'center', margin: '4px',
        minHeight: 190
    }}>

        <Typography variant="h6" gutterBottom>Book a Session</Typography>
        <Grid>
            <Grid item>
                <Button disabled={!lvl2complete} variant="contained" color="primary" style={{ margin: '8px' }}>
                    Math
                </Button>

                <Button disabled={!lvl2complete} variant="contained" color="secondary" style={{ margin: '8px' }}>
                    Reading
                </Button>
            </Grid>
            <Grid item>
                <Button component={Link} to='/submit-essay' disabled={!lvl2complete} variant="contained" color="secondary" style={{ margin: '8px' }}>
                    Essay Review
                </Button>
            </Grid>
        </Grid>



        {!lvl2complete && (
            <Typography>Please Finish Setting Up Your Account</Typography>
        )}

    </Paper>    

)}