import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {TextFieldElement, FormContainer, TextareaAutosizeElement, useFormContext, useForm } from 'react-hook-form-mui'

import axios from 'axios'

import { useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    '&.MuiStepIcon-root': {
                        color: '#f0e68c', // Color for disabled (inactive) step icon
                    },
                    '&.Mui-active': {
                        color: '#f0e68c', // Color for active step icon
                    },
                    '&.Mui-completed': {
                        color: '#8fbc8f', // Color for completed step icon
                    },

                },
            },
        },    
    },
})

const stepIconTextColor = {
    '& .MuiStepIcon-text': {
      fill: 'black', // Set the color for the circle's number
    },
};

function StepButtonGroup ( { handleNext, handleBack, activeStep } ) {
    const { formState } = useFormContext()
    const { errors } = formState
    const ifErrorExists = Object.keys(errors).length !== 0
    return (
        <div>
        <Button
            variant="contained"
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
            disabled={ifErrorExists}
        >
            {activeStep === 2 ? 'Finish' : 'Continue'}
        </Button>
        <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
        >
            Back
        </Button>
        </div>
    )
}

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate()
  const [error, setError] = React.useState('')

  const form = useForm({
    mode: "all"
  })

  const handleNext = () => {
    form.trigger().then(isValid => {
        if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    })
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = (data) => {
    console.log(data);

    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    
    // Convert graduationyear and gradelevel to a string
    data.graduationyear = String(data.graduationyear);
    data.gradelevel = String(data.gradelevel);


    const axiosIntance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        timeout: 1000,
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',  // Ensure the content type is set to JSON

        }
    })

    axiosIntance.post(`level2form/${username}`, data)
        .then(response => {
            if (response.status === 200) {
                console.log('form went through : 200')
                navigate('/dashboard')
            }
        })
        .catch(error => {
            setError("Sorry, There was an Issue. Please check your answers")
            console.log('aint go through my boi')
            console.error(error)
        })
    // Handle form submission here
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ maxWidth: 300 }}>
        <FormContainer
            onSuccess={onSubmit}
            formContext={form}
        >
        <Stepper activeStep={activeStep} orientation="vertical">
            <Step sx={stepIconTextColor}>
                <StepLabel>
                    <Typography>Where do you go to school?</Typography>
                </StepLabel>
                <StepContent>
                    <Box>
                        <TextFieldElement name="school" label="Current School" margin={'dense'} type='text' required/>
                        <TextFieldElement name="town" label="Town" margin={'dense'} type='text' required/>
                        <TextFieldElement margin={'dense'} label={'Grade'} 
                                          name={'gradelevel'} required type={'number'}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          

 
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <StepButtonGroup 
                            activeStep={activeStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </Box>
                </StepContent>
            </Step>
            <Step sx={stepIconTextColor}>
                <StepLabel>
                    <Typography>When do you graduate?</Typography>
                </StepLabel>
                <StepContent>
                    <Box>
                        <TextFieldElement margin={'dense'} label={'Graduation Year'} 
                                          name={'graduationyear'} required type={'number'}
                                          inputProps={{
                                            min: 2020,  
                                            max: 2040, 
                                          }}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}

                        />
                        <TextFieldElement required margin='dense' label='Nearest University' 
                                          name='nearestuni' type='text' 

                                          
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <StepButtonGroup 
                            activeStep={activeStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </Box>
                </StepContent>
            </Step>
            <Step sx={stepIconTextColor}>
                <StepLabel>
                    <Typography>Tell us a little about yourself</Typography>
                </StepLabel>
                <StepContent>
                    <Box>
                    <TextareaAutosizeElement
                        label="Dont overthink it!"
                        name="bio"
                        rows={4}
                        required
                    />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <StepButtonGroup 
                            activeStep={activeStep}
                            handleBack={handleBack}
                            handleNext={handleNext}
                        />
                    </Box>
                </StepContent>
            </Step>
        </Stepper>
        {activeStep === 3 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - Now Submit </Typography>
          <div>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
          <Button type='submit' variant='contained' sx={{ mt: 1, mr: 1 }}>
            Submit
          </Button>
          </div>
          {error && (
            <Typography>{{error}}</Typography>
          )}
        </Paper>
      )}
    </FormContainer>

    </Box>
    </ThemeProvider>
  );
}