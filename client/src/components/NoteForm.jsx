import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import closeImage from '../images/x.svg';

const NoteForm = ({session, closeButton}) => {
  const [noteType, setNoteType] = useState('Garden');
  const [noteFor, setNoteFor] = useState('');
  const [note, setNote] = useState('');
  const [noteLink, setNoteLink] = useState('');
  const [userPlants, setUserPlants] = useState([]);
  const [userPlots, setUserPlots] = useState([]);

  const generateRandomNoteLink = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const refreshPage = ()=>{
    window.location.reload();
   }


  useEffect(() => {
    const fetchUserPlantsAndPlots = async () => {
      try {
        // Fetch user's plants
        const { data: plantsData, error: plantsError } = await supabase
          .from('plants')
          .select('plant_name')
          .eq('user_id', session.user.id);
        if (plantsError) {
          throw plantsError;
        }
        setUserPlants(plantsData);

        // Fetch user's plots
        const { data: plotsData, error: plotsError } = await supabase
          .from('plots')
          .select('name')
          .eq('user_id', session.user.id);
        if (plotsError) {
          throw plotsError;
        }
        setUserPlots(plotsData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserPlantsAndPlots();
    setNoteLink(generateRandomNoteLink().toString());
  }, []);

  const handleNoteTypeChange = (value) => {
    setNoteType(value);
    setNoteFor('');
  };

  const handleNoteForChange = (value) => {
    setNoteFor(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert data into the "notes" table
      const { data, error } = await supabase.from('notes').insert([{ note_type: noteType, note_for: noteFor, note: note, note_link: noteLink }]);
      if (error) {
        throw error;
      }
      console.log('Note data saved successfully:', data);
      // Reset form inputs after submission
      setNoteType('General');
      setNoteFor('');
      setNote('');
      setNoteLink('');
    } catch (error) {
      console.error('Error saving note data:', error.message);
    } refreshPage();
  };

  return (
    <div className='relative inter w-full mt-12 max-w-md lg:w-96 mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200'>
        <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-2 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>
        <h2 className='text-2xl font-normal mb-4 text-customMidGreen'>Write Note</h2>
        <form onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-gray-700'>Note Type:</label>
        <select value={noteType} 
        className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
        onChange={(e) => handleNoteTypeChange(e.target.value)} required>
          <option value="Garden">Garden</option>
          <option value="Plant">Plant Note</option>
          <option value="Plot">Plot Note</option>
        </select>
      </div>
      {noteType === 'Plant' && (
        <div className='mb-4'>
          <label className='block text-gray-700'>Note For:</label>
          <select value={noteFor} 
          className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
          onChange={(e) => handleNoteForChange(e.target.value)} required>
            <option value="">Select Plant</option>
            {userPlants.map((plant, index) => (
              <option key={index} value={plant.plant_name}>{plant.plant_name}</option>
            ))}
          </select>
        </div>
      )}
      {noteType === 'Plot' && (
        <div className='mb-4'>
          <label className='block text-gray-700'>Note For:</label>
          <select value={noteFor} 
          className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
          onChange={(e) => handleNoteForChange(e.target.value)} required>
            <option value="">Select Plot</option>
            {userPlots.map((plot, index) => (
              <option key={index} value={plot.name}>{plot.name}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className='block text-gray-700'>Note:</label>
        <textarea value={note} 
        className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
        onChange={(e) => setNote(e.target.value)} required />
      </div>
      <button className="mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      type="submit">Save Note</button>
    </form>
    </div>
  );
};

export default NoteForm;

