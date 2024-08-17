import * as React from 'react';

import {Routes, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';
import Logout from './pages/Logout';
import ExtraSignup from './pages/ExtraSignup';
import TutorDashboard from './pages/tutorview/TutorDashboard';
import SubmitEssay from './pages/appointments/SubmitEssay';
import LandingTest from './pages/LandingTest';

import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer';
import About from './pages/About';

export default function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false)

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  }

  return (
    <>
      <NavDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} isUserLoggedIn={isUserLoggedIn}/>
      <TopBar toggleDrawer={toggleDrawer} setIsUserLoggedIn={setIsUserLoggedIn} />

      <Routes>
        <Route path='/' element={<LandingTest />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogIn setIsUserLoggedIn={setIsUserLoggedIn} />} /> 
        <Route path='/logout' element={<Logout />} />
        <Route path='/extra-signup' element={<ExtraSignup />} />
        <Route path='/tutor-dashboard' element={<TutorDashboard />} />
        <Route path='/submit-essay' element={<SubmitEssay />} />
        <Route path='/report-bug' element={0} />
        <Route path='/contact' element={0} />
        <Route path='/testlanding' element={<LandingTest />} />
      </Routes>

    </>
    
  );
}



