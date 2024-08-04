import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import LoadingButton from '@mui/lab/LoadingButton';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { Box, Grid, Stack, TextField, Typography} from '@mui/material';
import axios from 'axios';

function getLocalTokenPromise () {
    return new Promise((resolve, reject) => {
        try {
            const localToken = localStorage.getItem('token')
            resolve(localToken)
        } catch (error) {
            reject(error)
        }
    })
}

export default function TutorAppointmentDialog({ apptDialogData, apptDialogOpen, setApptDialogOpen }) {
  const [confirmCancel, setConfirmCancel] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState(null)
  const [rating, setRating] = React.useState(null)


  
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
    setRating(null)
  };


  const handleFirstCancel = () => {
    setConfirmCancel(true)
  }

  const handleConfirmedCancel = () => {
    console.log('confirmedCancelAppt ran')
    setLoading(true)
    setTimeout(() => {
        setLoading(false)
        handleClose() 
    }, 2000);
  }

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 1000,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getLocalTokenPromise()
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config  
  })

  const handleSubmitRating = () => {
    console.log(rating)
    //API logic for seting the rating 
    handleClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    console.log(formData)
    console.log(formJson)

    axiosInstance.patch(`update-appointment/${apptDialogData.id}/`, {
        status: 'cancelled'
    })
    .then(response => {
        if (response.status === 200) {
            handleConfirmedCancel()
        }
    })
    .catch(error => {
        console.error(error)
        if (error.response) {
            if (error.response.status === 401) {
                setErrorMsg('Your request could not be validated. Please login again.')
                setLoading(false)
            }
        } else {
            setErrorMsg('Sorry, an issue occured with your request')
            setLoading(false)
        }
    })

   }


  return (
    <Dialog
      open={apptDialogOpen}
      onClose={handleClose}
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
            { label: 'Duration:', value: apptDialogData.duration_minutes },
            { label: 'Subject:', value: apptDialogData.subject },
            { label: 'Location:', value: apptDialogData.location || 'N/A' },
            { label: 'Status:', value: apptDialogData.status },
            { label: 'Contact Email:', value:apptDialogData.tutor_email },
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

      {}

      {apptDialogData.status === 'scheduled' && dayjs(apptDialogData.date_time).isAfter(dayjs()) && (
        <Stack>
        <Typography variant='h5'>Post Session Form (Required)</Typography>
        <TextField
          label='Post Session Comments'
        />
        <Button 
         variant='contained'
        >
        Submit  
        </Button>
        </Stack>
          
      
      )}

      {apptDialogData.status === 'scheduled' && (
        <Button variant="contained" color="error" disabled={confirmCancel}
            onClick={() => handleFirstCancel()}
        >
            Cancel Appointment
        </Button>
      )}

      </DialogActions>
        { confirmCancel && (
            <Stack

                sx={{
                    my:1,
                    justifyContent: 'center', 
                    textAlign: 'center',
                    px: 3,
                    pb: 2,
                }}
                
            >
                <Typography>Are you sure?</Typography>
                <TextField 
                    id='cancel-reason'
                    label='Reason for Cancellation?'
                    sx={{my: 2}}
                />
                <Button variant='contained' 
                    onClick={() => setConfirmCancel(false)}
                    sx={{ m: 1 }}
                > 
                    No, Take me Back!
                </Button>

                <LoadingButton 
                    type='submit'
                    sx={{ m: 1 }}
                    variant="contained" 
                    color="error" 
                    onClick={handleConfirmedCancel}
                    endIcon={<HighlightOffIcon />}
                    loading={loading}
                    loadingPosition="end"
                >
                <span>
                    Yes, Cancel Appointment
                </span>
                </LoadingButton>

                {errorMsg && (
                    <Typography> {errorMsg} </Typography>
                )}
            </Stack>
          )
        }
    </Dialog>
  );
}