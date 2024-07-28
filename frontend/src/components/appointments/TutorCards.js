import React from "react";
import {Box, Card, CardActionArea, CardActions, Typography, Stack, Avatar, Divider} from '@mui/material'
import {List, ListItem, ListItemText} from "@mui/material";
import { Button, Collapse} from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';


export default function TutorCards ({tutorOptions, handleTutorCardClick, chosenCard, handleViewProfile}) {
    return( 
    <Box style={{ display: 'flex', overflowX: 'auto', maxWidth: '100%' }}>
    {tutorOptions && (
            <Box sx={{minHeight: 200, display: 'flex', flexDirection: 'row'}}>
            <></>
            {tutorOptions.map((tutor, index) => (
                <Card key={index} variant='outlined' sx={{width: 200,
                    bgcolor: index === chosenCard ? '#c6e2c6' : '#f5f5f5', mx: 1}}
                >
                <CardActionArea onClick={() => handleTutorCardClick(index, tutor)}>
                    <Stack alignItems="center" >
                        <Avatar sx={{marginTop: 2}}/>
                        <Typography my={1} variant="h6">
                            {`${tutor.first_name} ${tutor.last_name}`}
                        </Typography>
                        <Divider sx={{width: '90%'}} />
                        <Typography my={1}>
                            {tutor.subjects}
                        </Typography>
                        <Divider sx={{width: '90%'}} />
                            <List dense={true} sx={{width: '100%'}}>
                                <ListItem>
                                    <ListItemText primary={
                                        <>
                                        <Typography variant="body1">
                                            Thursday: 3am - 5pm
                                        </Typography>
                                        </>
                                    } />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <>
                                        <Typography variant="body1">
                                            Thursday: 3am - 5pm
                                        </Typography>
                                        </>
                                    } />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={
                                        <>
                                        <Typography variant="body1">
                                            Thursday: 3am - 5pm
                                        </Typography>
                                        </>
                                    } />
                                </ListItem>
                            </List>

                        <Divider sx={{width: '90%', marginTop: '10px'}} />
                    </Stack>
                </CardActionArea>
                <CardActions sx={{alignContent: 'center'}}>
                    <Button size="small" color="primary" onClick={() => handleViewProfile(index, tutor)}>
                        view profile
                    </Button>
                                
                    <Collapse in={index === chosenCard} orientation="horizontal">
                        <CheckCircleOutlineOutlinedIcon sx={{pl: 5}} />
                    </Collapse>
                
                </CardActions>
                </Card>
            ))}
            </Box>
    )}
</Box>

    )
}
