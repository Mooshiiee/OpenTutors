import { ThemeProvider } from "@emotion/react";
import { createTheme, Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function TutorDashboard () {

    const defaultTheme = createTheme({
        palette: {
          primary: {
            main: '#6495ed',
          },
          secondary: {
            main: '#ffa07a',
          },
          info: {
            main: '#f5fffa',
          }
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ bgcolor: 'primary.main', my: 2}}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12}>
                            <Paper elevation={12} sx={{ padding: '16px', textAlign: 'center',
                            m: '4px'}}>
                                <Typography variant="h5"> Tutor Dashboard</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    )
}



