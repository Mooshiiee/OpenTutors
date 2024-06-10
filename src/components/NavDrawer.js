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

export default function NavDrawer( {toggleDrawer, drawerOpen} ) {
    
    const drawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
            {['Home','Contact Us', 'About Us'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                    {index % 2 === 0 ? <MailIcon /> : <AutoStoriesIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
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