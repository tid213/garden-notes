import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import googleIcon from '../images/google-icon.svg';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      setMessage('Sign in successful.');
    } catch (error) {
      setMessage('Error signing in. Please try again.');
      console.error('Error signing in:', error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <div className="max-w-sm mx-auto inter p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-3xl text-customMidGreen font-semibold mb-4">sign in<b className='text-customOrange'>.</b></h2>
  <form onSubmit={handleSignIn}>
    <div className="mb-4">
      <label className="block text-gray-700">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
        required
      />
    </div>
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
    >
      {loading ? 'Signing In...' : 'Sign In'}
    </button>
  </form>
  <div className="mt-6 relative">
    <div className="absolute inset-0 flex items-center">
        <div className="w-full bg-gray-700" style={{ height: "1px" }}></div>
    </div>
    <div className="relative flex justify-center">
        <span className="px-4 bg-white text-sm text-gray-700 uppercase">or</span>
    </div>
</div>
  <button
    onClick={handleGoogleSignIn}
    className="mt-4 flex items-center justify-center w-full bg-white hover:border-lime-500 border-lime-500 text-gray-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
    >
    <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
    Continue with Google
</button>
  {message && <p className="mt-4 text-red-500">{message}</p>}
  <div className="mt-4 text-center">
        <Link to="/forgotpassword" className="text-green-800 hover:text-green-600">Forgot password</Link>
      </div>
  <div className="mt-4 text-center">
        <Link to="/signup" className="text-green-800 hover:text-green-600">Not already registered? Sign up</Link>
      </div>
      <div className="mt-2 text-center">
        <Link to="/" className="text-green-800 hover:text-green-600">Go back to Home</Link>
      </div>
</div>

  );
};

export default SignInForm;