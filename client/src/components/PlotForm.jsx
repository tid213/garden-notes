import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import closeImage from '../images/x.svg';

const PlotForm = ({ plotId, session, closeButton, editButton }) => {
  const [name, setName] = useState('');
  const [sunType, setSunType] = useState('Full Sun');
  const [soilType, setSoilType] = useState('');
  const [soilPh, setSoilPh] = useState('');
  const [userPlots, setUserPlots] = useState([]);

  const refreshPage = ()=>{
    window.location.reload();
  }

  useEffect(() => {
    console.log(plotId)
    const fetchPlotData = async () => {
      try {
        // Fetch plot data if editing existing plot
        if (plotId) {
          const { data, error } = await supabase
            .from('plots')
            .select('*')
            .eq('id', plotId)
          if (error) {
            throw error;
          }
          setName(data[0].name);
          setSunType(data[0].sun_type ? data[0].sun_type : "");
          setSoilType(data[0].soil_type ? data[0].soil_type : "");
          setSoilPh(data[0].soil_ph ? data[0].soil_ph : "");
        }

        // Fetch user's plots from Supabase
        const { data: plotsData, error: plotsError } = await supabase
          .from('plots')
          .select('*')
          .eq('user_id', session.user.id);
        if (plotsError) {
          throw plotsError;
        }
        setUserPlots(plotsData);
      } catch (error) {
        console.error('Error fetching plot data:', error.message);
      }
    };

    fetchPlotData();
  }, [plotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert or update plot data
      const plotData = {
        id: plotId,
        name,
        sun_type: sunType,
        soil_type: soilType,
        soil_ph: parseInt(soilPh),
        
      };
      const { error } = await supabase.from('plots').upsert(plotData, { returning: 'minimal' });
      if (error) {
        throw error;
      }
      refreshPage();
    } catch (error) {
      console.error('Error saving plot data:', error.message);
    }
  };

  return (
    <div className='relative inter w-full mt-12 max-w-sm lg:w-96 mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200'>
      {plotId ? <div onClick={()=> editButton("close edit plot")} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div> : 
                <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>}
      {plotId ? <h2 className='font-normal text-2xl mb-4 text-customMidGreen'>Edit Plot</h2> : 
                <h2 className='text-2xl font-normal mb-4 text-customMidGreen'>Add Plot</h2>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name:</label>
          <input type="text" value={name} 
          className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
          onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Sun Type:</label>
          <select value={sunType} 
          className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
          onChange={(e) => setSunType(e.target.value)}>
            <option value="Full Sun">Full Sun</option>
            <option value="Part Sun">Part Sun</option>
            <option value="Part Shade">Part Shade</option>
            <option value="Full Shade">Full Shade</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Soil Type:</label>
          <input type="text" value={soilType} 
          className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
          onChange={(e) => setSoilType(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Soil pH:</label>
          <input type="number" value={soilPh} 
          className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
          onChange={(e) => setSoilPh(e.target.value)} />
        </div>
        <button className="mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        type="submit">Save Plot</button>
        {plotId ? <button className="mt-4 w-full bg-black hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        type="submit">Delete Plot</button> : ""}
      </form>
    </div>
  );
};

export default PlotForm;
