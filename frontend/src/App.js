import * as React from 'react';

import {Routes, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';
import Logout from './pages/Logout';
import ExtraSignup from './pages/ExtraSignup';

import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer';

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
        <Route path='/' element={<Landing />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogIn setIsUserLoggedIn={setIsUserLoggedIn} />} /> 
        <Route path='/logout' element={<Logout />} />
        <Route path='/extra-signup' element={<ExtraSignup />} />
      </Routes>

    </>
    
  );
}



