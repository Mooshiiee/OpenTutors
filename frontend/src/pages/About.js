import { Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ bgcolor: '#8fbc8f', minHeight: '100vh', pt: 2, pb: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
          About Open Tutors
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                Open Tutors provides free, accessible tutoring to public school students. We believe every student deserves quality educational support, regardless of their background.
              </Typography>
              <Typography variant="body1">
                By connecting passionate tutors with eager learners, we aim to bridge the educational gap and empower students to reach their full potential.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={12} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                The Developers
              </Typography>
              <Typography variant="body1" paragraph>
                Our team consists of dedicated educators, technologists, and visionaries committed to making a difference in students' lives.
              </Typography>
              <Typography variant="body1">
                We combine expertise in education, technology, and community outreach to create an innovative platform connecting students with essential learning resources.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}