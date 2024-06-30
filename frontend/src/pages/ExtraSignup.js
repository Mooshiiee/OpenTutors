import * as React from 'react'
import { Paper, Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import VerticalLinearStepper from '../components/LevelTwoStepper';

const SignUpFormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '100%', // Ensure it takes the full width of the container
  }));

export default function ExtraSignup() {
    return(
    <Box sx={{ bgcolor: '#8fbc8f', minHeight: '100vh', display: 'flex', 
    justifyContent: 'center' }}>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <SignUpFormPaper>
                    <Grid>
                        <Grid item>
                            <Typography variant="h5"
                            sx={{my: 2}}>Tell us more about yourself</Typography>
                        </Grid>
                        <Grid item>
                            <VerticalLinearStepper />
                        </Grid>
                    </Grid>

                </SignUpFormPaper>
            </Box>
        </Container>
    </Box>
    )
}