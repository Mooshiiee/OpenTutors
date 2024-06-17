import * as React from 'react';

import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import Landing from './pages/Landing';
import LogIn from './pages/LogIn';

import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer';

export default function App() {

  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  }

  return (
    <>
      <NavDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer}/>
      <TopBar toggleDrawer={toggleDrawer} />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login/' element={<LogIn />} /> 
      </Routes>

    </>
    
  );
}



