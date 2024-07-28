import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardHeader, Typography, Divider, Avatar } from '@mui/material'

export default function ListTutorsDashboard ( {tutors} ) {
    return (
    <Box style={{ display: 'flex', overflowX: 'auto', padding: '16px' }}>
        {tutors.map((tutor, index) => (
            <Box>
            <Card key={index} style={{margin: '4px', bgcolor: '#f5f5f5' }}>
                <CardActionArea>
                    <CardHeader 
                        avatar={
                            <Avatar />
                        }
                        title={
                            <Typography variant='h6'>{tutor.first_name} {tutor.last_name}</Typography>
                        }
                        subheader={
                            tutor.school
                        }
                        subheaderTypographyProps={{noWrap: true}}
                    />
                    <CardContent sx={{pt:0}}> 
                            <Typography variant="body2">
                                {tutor.bio}
                            </Typography>
                            <Divider sx={{ my: 1 }}/>
                            <Typography variant="body2" color="textSecondary"  >
                                {tutor.subjects}
                            </Typography>
                    </CardContent>
                    
                </CardActionArea>
            </Card>
            </Box>
        ))}
    </Box>
    )
}
