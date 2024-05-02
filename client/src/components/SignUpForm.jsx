import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import googleIcon from '../images/google-icon.svg';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      setMessage('Sign up successful. Please check your email for verification.');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error('Error signing up:', error.message);
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
    <div className=" inter max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-customMidGreen">sign up<b className='text-customOrange'>.</b></h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
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
        <Link to="/signin" className="text-green-800 hover:text-green-600">Already registered? Sign in</Link>
      </div>
      <div className="mt-2 text-center">
        <Link to="/" className="text-green-800 hover:text-green-600">Go back to Home</Link>
      </div>
    </div>
  );
};

export default SignUpForm;