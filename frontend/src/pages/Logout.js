import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function Logout () {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)

    //use useEffect to make sure it runs only when the component mounts & prevent issues
    useEffect(() => {

        setLoading(true)
        const token = localStorage.getItem('token')


        if (token) {
            const axiosInstance = axios.create({
                baseURL: 'http://127.0.0.1:8000/api/',
                timeout: 1000,
                headers: { 'Authorization': `Token ${token}` }
            });
        
            axiosInstance.post('auth/logout/')
            .then(response => {
                if (response.status === 204) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('username')
                    localStorage.removeItem('is_tutor')
                    setTimeout(() => {
                        setLoading(false);
                        navigate('/');
                    }, 1000); // Show spinner for 1 second, then navigate
                }
            })
            .catch(error => {
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                if (error.response.status === 401) {
                    setTimeout(() => {
                        setLoading(false);
                        navigate('/');
                    }, 1000); // Show spinner for 1 second, then navigate
                }
                    
            })
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 1000); // Show spinner for 1 second
        }

    }, [navigate] )


    return (
        <Box sx={{
            bgcolor: '#8fbc8f',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            }}
        >
            {loading ? < CircularProgress sx={{color: "#ffe4b5"}}/> : null}
        </Box>  
    )
    
}