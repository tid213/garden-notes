import React, { useState, useEffect, Profiler } from "react";
import { Navigate } from 'react-router-dom';
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NoteBook from "./pages/NoteBook";
import NotFoundPage from "./pages/NotFoundPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={!session ? <Home /> : <Navigate to="/dashboard" />}/>
          <Route path="/dashboard" element={session ? <Dashboard session={session} /> : <Navigate to="/" />} />
          <Route path='/signin' element={!session ? <SignIn /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!session ? <SignUp /> : <Navigate to="/dashboard" />} />
          <Route path="/forgotpassword" element={!session ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
          <Route path="/changepassword" element={ <ChangePassword session={session}/>} />
          <Route path="/notebook/:id" element={<NoteBook />} />
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default React.memo(App);
