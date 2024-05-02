import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import closeImage from '../images/x.svg';

const AccountForm = ({session, closeButton}) => {
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [zone, setZone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      setLoading(true);
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', session.user.id)
        if (error) {
          throw error;
        }
        if (data) {
          setUsername(data[0].username || '');
          setWebsite(data[0].website || '');
          setAvatarUrl(data[0].avatar_url || '');
          setZone(data[0].zone || '');
          setZipCode(data[0].zip_code || '');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      setMessage('Error fetching profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const { user } = session;
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            username,
            website,
            avatar_url: avatarUrl,
            zone,
            zip_code: zipCode,
          });
        if (error) {
          throw error;
        }
        setMessage('Profile updated successfully.');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inter relative mt-12 max-w-sm lg:w-96 mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>
      <h2 className="text-2xl font-normal mb-4 text-customMidGreen">Account</h2>
      <form onSubmit={handleSubmit} >
        <div className='mb-4'>
          <label className='block text-gray-700'>Username:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Grow Zone:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Zip Code:</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button className="mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        type="submit" disabled={loading}>Save</button>
        <button className="mt-4 w-full bg-customDarkGreen hover:bg-black text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
            Change Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountForm;
