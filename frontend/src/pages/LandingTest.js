import { useState } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'

import RocketRoundedIcon from '@mui/icons-material/RocketRounded';
import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded'

const navigation = [
  { name: 'About Us', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function LandingTest() {
  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      bgcolor: 'transparent',
    }}>
      {/* Gradient background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden',
        }}
      >
        <Box
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
        />
      </Box>

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1}}>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            pt: 8,
            pb: 15,
          }}
        >
          {navigation.map((item) => (
            <Button
              key={item.name}
              href={item.href}
              sx={{ mx: 1.5, color: 'text.primary', fontWeight: 600, fontSize: '0.875rem' }}
            >
              {item.name}
            </Button>
          ))}
          <Button 
            sx={{ ml: 1.5, fontWeight: 600, fontSize: '0.875rem' }}
            endIcon={<RocketLaunchRounded />}
        >
            Log in
          </Button>
        </Box>

        <Container maxWidth="xl" sx={{ pt: { xs: 4, md: 0 } }}>
          <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', mb: 4 }}>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '9999px',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { borderColor: 'text.secondary' },
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Want to become a tutor? Sign up{' '}
                  <Link href="#" color="primary" sx={{ fontWeight: 600, textDecoration: 'none' }}>
                    here →
                  </Link>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 800, fontSize: { xs: '3rem', sm: '3.75rem' }, mb: 3 }}>
                Free academic tutoring for everybody
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                We are a free service dedicated to providing tutoring services to students attending grades middle school and up.
                Our tutors are volunteer college students who embrace both the love of learning, and the challenges it brings.
                Let us help you.
              </Typography>
              <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href="#"
                  sx={{ px: 3, py: 1.5, fontWeight: 600, fontSize: '0.875rem', textTransform: 'none' }}
                  endIcon={<RocketRoundedIcon />}
                >
                  Get started
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}