import React from 'react';
import Box from '@mui/material/Box';

export default function GradientBackground ({ children }) {
  return (
    <Box sx={{position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      bgcolor: 'transparent',
    }}>
      {/* Gradient background */}
      <Box sx={{position: 'absolute',
          top:0,
          left:0,
          right:0,
          bottom:0,
          zIndex:-1,
          overflow: 'hidden',
        }}
      ><Box
          sx={{
            position: 'fixed',
            top: '-50%',
            left: '-50%',
            right: '-50%',
            bottom: '-50%',
            width: '200%',
            height: '200%',
            backgroundImage: 'radial-gradient(ellipse at top left, #3be227, #273be2)',
            transform: 'rotate(0deg)',
            opacity: 0.5,
            filter: 'blur(100px)',
          }}
        /></Box>

      {/* Content */}
      <Box sx={{position: 'relative', zIndex:1 }}>
        {children}
      </Box>
      
    </Box>
  );
}
