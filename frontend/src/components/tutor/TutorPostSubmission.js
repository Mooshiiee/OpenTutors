import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { InputLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import EastIcon from "@mui/icons-material/East";
import axios from "axios";

export default function TutorPostSubmission ( {id, handleRefreshClose} ) {

    const [attendance, setAttendance] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    function getTokenAsync () {
        return new Promise((resolve, reject) => {
            try {
                const token = localStorage.getItem('token')
                resolve(token)
            } catch (error) {
                reject(error)
            }
        })
    }

    const handleChange = (event) => {
        setAttendance(event.target.value)
        setComment('')
        console.log(attendance)
    }

    const submitButtonLabel = attendance === 'no-show' ? 'Mark as No-Show' : 'Submit Post-Session Form';
    const submitButtonColor = attendance === 'no-show' ? 'error' : 'primary';

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
    
    const disabledCondition = () => {
        if (attendance) {
            if (attendance === 'completed' && comment === '') {
                return true
            }
            return false
        } 
        return true
    }

    const handleFormSubmit = () => {

        setLoading(true)
        const data = { status: attendance}
        if (attendance === 'completed') {
            data.post_session_comment = comment
        }
        console.log(data)

        axiosInstance.patch(`tutor-update-appointment/${id}/`, data)
        .then(response => {
            if (response.status === 200) {
                setLoading(false)
                handleRefreshClose()
            }
        })
        .catch(error => {
            console.error(error)
            setLoading(false)
        })


    }

return (
    <Stack >

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label">Did the Student Show Up?</InputLabel>
            <Select
            labelId="label"
            id="demo-simple-select-standard"
            value={attendance}
            onChange={handleChange}
            label="Age"
            >
            <MenuItem value={'completed'}>Yes, Student showed up</MenuItem>
            <MenuItem value={'no-show'}>No, Student did not show up</MenuItem>
            <MenuItem value={'cancelled'}>Student contacted prior about cancellation</MenuItem>

            </Select>
        </FormControl>

        {attendance === 'completed' && (
            <TextField
            id='post-comments'
            label='Post Session Comments'
            onChange={(event) => {
                setComment(event.target.value)
            }}
            sx={{my:2}}
            multiline
            rows={2}
            />          
        ) }

        <LoadingButton 
          sx={{ m: 1 }}
          variant="contained" 
          onClick={handleFormSubmit}
          endIcon={<EastIcon />}
          loading={loading}
          loadingPosition="end"
          color={submitButtonColor}
          disabled={disabledCondition()}
        >
          <span>
            {submitButtonLabel}
          </span>
        </LoadingButton>
    </Stack>
)
}