import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

export default function AppointmentDialog({ apptDialogData, apptDialogOpen, setApptDialogOpen }) {
  const [confirmCancel, setConfirmCancel] = React.useState(false);


  dayjs.extend(utc)
  const formattedDateTime = (dateTimeString) => {
    const date = dayjs(dateTimeString)
    return date.format('MMM D, h:mm A')
  }

  const formattedName = (apptDialogData) => {
    return `${apptDialogData.tutor_first_name} ${apptDialogData.tutor_last_name}`
  }

  const handleClose = () => {
    setApptDialogOpen(false);
    setConfirmCancel(false)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    console.log(formData)
    console.log(formJson)
    handleClose();
  }

  const handleFirstCancel = () => {
    setConfirmCancel(true)
  }

  const handleConfirmedCancel = () => {
    console.log('confirmedCancelAppt ran')
  }

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={apptDialogOpen}
      onClose={handleClose}
      fullWidth={fullScreen}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Details 
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{}}>
        <Grid container spacing={2} sx={{ my: 2 }}>
          {[
            { label: 'Tutor:', value: formattedName(apptDialogData)},
            { label: 'Date & Time:', value: formattedDateTime(apptDialogData.date_time) },
            { label: 'Duration:', value: apptDialogData.duration },
            { label: 'Subject:', value: apptDialogData.subject },
            { label: 'Location:', value: apptDialogData.location || 'N/A' },
            { label: 'Status:', value: apptDialogData.status },
          ].map((item, index) => (
            <Grid item container key={index} spacing={2}>
              <Grid item xs={4}>
                <Typography variant="body2" fontWeight="bold">
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1">
                  {item.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ 
        display: 'flex', 
        justifyContent: 'end', 
        px: 3,
        pb: 2
      }}>
        <Button variant="contained" color="secondary"
                disabled={confirmCancel}
        >
          Contact Tutor
        </Button>
        <Button variant="contained" color="error" disabled={confirmCancel}
                onClick={() => handleFirstCancel()}
        >
          Cancel Appointment
        </Button>
      </DialogActions>
        { confirmCancel && (
            <Box
                sx={{
                    my:1,
                    justifyContent: 'center', 
                    textAlign: 'center',
                    px: 3,
                    pb: 2,
                }}
                
            >
                <Typography>Are you sure?</Typography>
                <Button variant='contained' 
                    onClick={() => setConfirmCancel(false)}
                    sx={{ m: 1 }}
                > 
                    No, Take me Back!
                </Button>
                <Button variant='contained' color="error"
                    onClick={() => handleConfirmedCancel()}
                    sx={{ m: 1 }}
                > 
                    Yes, Cancel Appointment
                </Button>
            </Box>
          )
        }
    </Dialog>
  );
}