// src/App.jsx
// import Home from './pages/Home';
// import Lists from './pages/List';
/* <Route path="/home" element={<Home />} />
        <Route path="/lists" element={<Lists />} /> */
        import React from 'react';
        import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
        import LoginSignup from './Components/auth/LoginSignup';
        import Dem from './pages/Dem';
        
        const App = () => {
          return (
            <Router>
              <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/dem" element={<Dem />} />
                <Route path="/signin" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          );
        };
        
        export default App;
        