import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MailIcon from '@mui/icons-material/Mail';
import CottageIcon from '@mui/icons-material/Cottage';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { Link } from 'react-router-dom';

export default function NavDrawer( {toggleDrawer, drawerOpen} ) {
    
    //this component re-mounts when initiated, no useEffect() needed
    const token = localStorage.getItem('token')
    const is_tutor = localStorage.getItem('is_tutor')

    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>

            {token && ( 
                <ListItem disablePadding>
                        <ListItemButton component={Link} to={is_tutor ? '/dashboard' : '/tutor-dashboard'}>
                        <ListItemIcon>
                            <DashboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard'/>
                    </ListItemButton>
                </ListItem>
            )}

            {[
                { text: 'Home', path: '/', icon: <CottageIcon /> },
                { text: 'Contact Us', path: '/contact', icon: <MailIcon /> },
                { text: 'About Us', path: '/about', icon: <AutoStoriesIcon /> },
            ].map((item, index) => (
                <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
                </ListItem>
            ))}
            
            {token ? (
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/logout'>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout'/>
                    </ListItemButton>
                </ListItem>
            ) : (
                <ListItem disablePadding>
                    <ListItemButton component={Link} to='/login'>
                        <ListItemIcon>
                            <RocketLaunchRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Login'/>
                    </ListItemButton>
                </ListItem>
            )
            }


            </List>
        </Box>
    );
    
    return (
        <>
        <Drawer anchor="left" 
                open={drawerOpen} 
                onClose={toggleDrawer(false)}
        >
            {drawerList}
        </Drawer>
        </>
    );
}