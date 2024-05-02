import React, { useState, useEffect } from 'react';
import { redirect } from "react-router-dom";
import { supabase } from '../supabaseClient';

const ChangePassword = () => {


  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    fetchSession()
  }, [])

  const fetchSession = async () => {
    try {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      // Use session data here
      console.log('Session:', session);
    } catch (error) {
      console.error('Error fetching session:', error.message);
    }
  };
  

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        throw error;
      }
      setMessage('Password updated successfully. You will be redirected.');
      setTimeout(function(){
        redirect("/");
      }, 2000)
    } catch (error) {
      console.error('Error updating password:', error.message);
      setMessage('Error updating password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;