import React, { useEffect, useState } from "react";
import { Box, Grid ,Divider, Paper, Typography, Button, Stack, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Chip, CircularProgress} from "@mui/material";
import { FormContainer, SelectElement, TextFieldElement, useForm, useController, useWatch} from "react-hook-form-mui";
import axios from "axios";
import TutorCards from "../../components/appointments/TutorCards";

import { DateCalendar, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

import { useNavigate } from "react-router-dom";

import SubmitEssayField from "../../components/appointments/SubmitEssayField";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import dayjs from 'dayjs'

export default function SubmitEssay() {
    const [tutorOptions, setTutorOptions] = useState(null)
    const [selectedTutor, setSelectedTutor] = useState(null)
    const [dialogInfo, setDialogInfo] = useState(null)
    const [chosenCard, setChosenCard] = useState(-1)
    const [dialogOpen, setDialogOpen] = useState(false)

    const [apptDate, setApptDate] = useState(null)
    const [apptTime, setApptTime] = useState(null)

    const [displayTime, setDisplayTime] = useState(null)
 
    const [stepOne, setStepOne] = useState(false)
    const [stepTwo, setStepTwo] = useState(false)

    const [essaySubmitMethod, setEssaySubmitMethod] = React.useState();

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate()

    function getTokenAsync() {
        return new Promise((resolve) => {
          const token = localStorage.getItem('token');
          resolve(token);
        });
      }

      const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 1000,
    });

    axiosInstance.interceptors.request.use(async (config) => {
        const token = await getTokenAsync()
        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        return config
    })

    useEffect(() => {
        axiosInstance.get('/get-tutors')
            .then(response => {
                setTutorOptions(response.data)
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        navigate('/login')
                    }
                }
                console.error(error)
            })
    }, [navigate, axiosInstance])


    //for duration_minutes field
    const durationMap = {
        1: 15,
        2: 20,
        3: 30
    };

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true)
        axiosInstance.post('/create-essay-appt/', {
            student_work_link: data.student_work_link,
            student_work_text: data.student_work_text,
            //student_work_file: data.student_work_file[0],
            student_username: localStorage.getItem('username'),
            tutor_id: data.tutor_id,
            appointment: {
                student_meeting_preference: data.student_meeting_preference,
                duration_minutes: durationMap[data.duration_minutes],
                additional_comments: data.additional_comments,
                date_time: data.date,
                subject: data.subject,
            }
        }).then(response => {
            if (response.status === 201) {
                setLoading(false);
                setSubmitted(true);
                setTimeout(() => {
                    setLoading(false)
                }, 2500);
                navigate('/dashboard')
            }
        }).catch(error => {
            console.error(error)
            setLoading(false)
        })
    }
    
    function handleTutorCardClick (index, tutor) {
        setSelectedTutor(tutor)
        setChosenCard(index)
        setValue('tutor_id', tutor.id)
    }

    function handleViewProfile (index, tutor) {
        setDialogInfo(tutor)
        setDialogOpen(true)
    }
    
    const handleClose = () => {
        setDialogOpen(false);
    };
    
    
    const handleDate = (value, context) => {
        if (context === 'finish') {
            setApptDate(value)
        };

    };

    const handleTime = (value, context) => {
        setApptTime(value)
        const time = value.format('h:mm A')
        setDisplayTime(time)

    };

    const handleEssaySubmitMethodChange = (event, value) => {
        console.log(value)
        setEssaySubmitMethod(value);
        console.log(essaySubmitMethod)
    };
    


    //initialize form with react-hook-form

    const form = useForm({
        mode: 'onChange',
        defaultValues: {
          subject: '',
          additional_comments: '',
          student_work_link: '',
          student_work_text: '',
          student_work_file: null
        }
      });
    const { watch, handleSubmit,setValue, control, formState: { isValid } } = form;


    const {field: date_time} = useController({name: 'date', control, defaultValue: null })

    //useWatch statements 
    const watchedTime = useWatch({ control, name: 'time' })
    const watchedDate = useWatch({ control, name: 'date' })
    const duration = watch("duration");
    const meetingPreference = watch("student_meeting_preference");

    const subject = watch('subject');
    const additionalComments = watch('additional_comments');

    const studentWorkLink = useWatch({ control, name: 'student_work_link' });
    const studentWorkText = useWatch({ control, name: 'student_work_text' });
    const studentWorkFile = useWatch({ control, name: 'student_work_file' });

    //to check if atleast one student-work option exists
     const isEssaySubmitted = () => {
         return (studentWorkLink || studentWorkText || studentWorkFile);
     };

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ bgcolor: '#8fbc8f', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
            <Paper elevation={3} sx={{maxWidth: '90%', padding: 2, width: '100%', marginTop: 2 }}>
                <FormContainer onSuccess={handleSubmit(onSubmit)} formContext={form} >
                    <Stack spacing={3} alignItems="center">
                        <Typography variant="h4" align="center" gutterBottom>
                            Essay Appointment
                        </Typography>

                        <Typography variant="h6"> 
                            Pick a tutor that matches your schedule 
                        </Typography>

                        <TutorCards 
                            tutorOptions={tutorOptions}
                            handleTutorCardClick={handleTutorCardClick}
                            chosenCard={chosenCard}
                            handleViewProfile={handleViewProfile}                            
                         />

                         
                        <Button variant="outlined" disabled={!selectedTutor} onClick={
                            () => { setStepOne(true) }
                        }>
                            next
                        </Button>
                        
                        <Divider sx={{width: '90%'}}/>

                        {stepOne && (
                            <>
                            <Typography variant="h6">Pick a time and date that matches your tutors availability </Typography>

                            <Grid container spacing={{ xs: 2, md: 2 }} 
                            columns={{ xs: 4, sm: 8, md: 12, width: '100%' }} justifyContent='center'
                            >
                                <Grid item>
                                    <Paper  elevation={6}>
                                        <DateCalendar label='Pick a Date' disablePast
                                        onChange={(value, context) => {
                                            handleDate(value, context)
                                            if (watchedDate && apptTime) {
                                                const newValue = value.hour(apptTime.hour()).minute(apptTime.minute())
                                                date_time.onChange(newValue)
                                            } else {
                                                date_time.onChange(value)
                                            }
                                            }} 
                                        />
                                    </Paper>
                                </Grid>
                                
                                <Grid item>
                                    <Stack direction='column' spacing={3} >
                                        <TimePicker sx={{my: 3, mx: 10}} label='Pick a Time' 
                                            onChange={(value, context) => {
                                                handleTime(value, context)
                                                if (watchedDate) {
                                                    const newValue = watchedDate.hour(value.hour()).minute(value.minute());
                                                    date_time.onChange(newValue);
                                                }
                                            }} 
                                            />
                                        <Paper elevation={6} sx={{m: 1, p: 3}}>
                                            <Typography variant="h3"> 
                                                {apptDate ? 
                                                    `${apptDate.$d.toDateString().slice(0,3)}, ${apptDate.$d.toDateString().slice(4,7)} ${apptDate.$d.toDateString().slice(8,10).replace(/^0+/,'')}`
                                                : 
                                                '--/--' }

                                                <br />
                                                {displayTime ?
                                                    `${displayTime}`
                                                :
                                                '--/--'}
                                            </Typography> 
                                        </Paper>
                                    </Stack> 
                                </Grid>
                            </Grid >

                            <Stack direction='row'>
                                <SelectElement
                                required 
                                sx={{width: 100, m: 2}}
                                name='duration' 
                                label='Minutes'
                                options={[
                                    {
                                    id: 1,
                                    label: '15',
                                    },
                                    {
                                    id: 2,
                                    label: '20'
                                    },
                                    {
                                    id : 3,
                                    label: '30'
                                    }
                                ]}
                                />

                                <SelectElement
                                required
                                sx={{width: 200, m: 2}} 
                                name='student_meeting_preference' 
                                label="Meeting Preference"
                                options={[
                                    {
                                    id: '2',
                                    label: 'Virtual'
                                    },
                                    {
                                    id: '1',
                                    label: 'In-Person'
                                    },
                                ]}
                            />

                        </Stack>
                            <Button variant="outlined" 
                            disabled={!apptDate || !apptTime || !duration || !meetingPreference} 
                            onClick={() => {setStepTwo(true)}}>
                                next
                            </Button>
                            </>

                        )}

                        {stepTwo && (
                        <>

                        <Divider sx={{width: '90%'}}/>

                        <Typography variant="h6">
                            Tell us more about your assignment 
                        </Typography>

                        <TextFieldElement name='subject' label='What class is this for?' 
                            rules={{required: "This field is required"}}
                        />
                        
                        <TextFieldElement 
                            name='additional_comments'
                            label='What is this essay about?'
                            sx={{ pb: 2, width: '100%' }}
                            rows={3}
                            multiline
                            rules={{ required: "This field is required"}}
                        />  

                        
                        <Typography variant="body1">Pick one or more method to submit your Essay</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={essaySubmitMethod}
                            exclusive
                            onChange={handleEssaySubmitMethodChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="link">Submit Link</ToggleButton>
                            <ToggleButton value="paste">Paste Document</ToggleButton>
                            <ToggleButton value="document" disabled>Upload File</ToggleButton>
                        </ToggleButtonGroup>    
                        
                        {essaySubmitMethod && (
                            <>
                            <SubmitEssayField 
                                essaySubmitMethod={essaySubmitMethod} 
                                setValue={setValue} 
                                control={control}
                                gutterBottom
                            />
                            </>
                        )} 

                        <Button type='submit' variant='contained' disabled={
                            !isValid || !isEssaySubmitted() || loading
                        }>
                            {loading ? <CircularProgress size={24} /> : submitted ? <CheckCircleIcon /> : "Submit"}
                        </Button>

                        <Divider sx={{width: '90%'}}/>
                        
                    </>
                    )}


                        
                    </Stack>

                </FormContainer>

                {tutorOptions && (
                    <Typography sx={{ mt: 2, wordBreak: 'break-word' }}>
                        {JSON.stringify(tutorOptions)}
                    </Typography>
                )}
            </Paper>
            {dialogInfo && (
                <Dialog 
                    maxWidth='xs'
                    open={dialogOpen}
                    onClose={handleClose}
                >
                    <DialogTitle gutterBottom sx={{display: 'flex'}}> <Avatar sx={{mr: 2}} /> {`${dialogInfo.first_name} ${dialogInfo.last_name}`}</DialogTitle>
                    <DialogContent>
                        <Chip label={dialogInfo.subjects} />
                        <br/>
                        <Typography mt={2}>
                            {dialogInfo.bio}
                        </Typography>
                        <br/>
                        <Typography>
                            {`School: ${dialogInfo.school}`}
                        </Typography>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            )}

        </Box>
    </LocalizationProvider>
    )
}