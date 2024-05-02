import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import closeImage from '../images/x.svg';

const PlantForm = ({ plantId, session, closeButton, editButton }) => {
  const [plantName, setPlantName] = useState('');
  const [sunType, setSunType] = useState('Full Sun');
  const [waterFreq, setWaterFreq] = useState('');
  const [fertFreq, setFertFreq] = useState('');
  const [plantPlot, setPlantPlot] = useState('');
  const [pruneFreq, setPruneFreq] = useState('Monthly');
  const [fertilizerFreq, setFertilizerFreq] = useState('Two weeks');
  const [plots, setPlots] = useState([]);

  const refreshPage = ()=>{
    window.location.reload();
   }

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        // Fetch plant data if editing existing plant
        if (plantId) {
          const { data, error } = await supabase
            .from('plants')
            .select('*')
            .eq('id', plantId)
          if (error) {
            throw error;
          }
          setPlantName(data[0].plant_name);
          setSunType(data[0].sun_type ? data[0].sun_type : "");
          setWaterFreq(data[0].water_freq ? data[0].water_freq : "");
          setFertFreq(data[0].fert_freq ? data[0].fert_freq : "");
          setPlantPlot(data[0].plant_plot ? data[0].plant_plot : "");
          setPruneFreq(data[0].prune_freq ? data[0].prune_freq : "");
          setFertilizerFreq(data[0].fertilizer_freq ? data[0].fertilizer_freq : "");
        }

        // Fetch plots data for dropdown
        const { data: plotsData, error: plotsError } = await supabase
          .from('plots')
          .select('id, name')
          .eq('user_id', session.user.id);
        if (plotsError) {
          throw plotsError;
        }
        setPlots(plotsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchPlantData();
  }, [plantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert or update plant data
      const plantData = {
        id: plantId,
        plant_name: plantName,
        sun_type: sunType,
        water_freq: waterFreq,
        fert_freq: fertFreq,
        plant_plot: plantPlot,
        prune_freq: pruneFreq,
        fertilizer_freq: fertilizerFreq
      };
      console.log(plantData)
      let { error } = await supabase.from('plants').upsert(plantData, { returning: 'minimal' });
      if (error) {
        throw error;
      }
      refreshPage();
    } catch (error) {
      console.error('Error saving plant data:', error.message);
    }
  };

  return (
    <div className='relative w-full inter mt-12 max-w-sm md:max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200'>
     {plantId ? <div onClick={()=> editButton("close edit plant")} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div> :
                <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>}
     {plantId ? <h2 className='text-2xl font-normal mb-4 text-customMidGreen'>Edit Plant</h2>:
                <h2 className='text-2xl font-normal mb-4 text-customMidGreen'>Add Plant</h2>}
     <form onSubmit={handleSubmit} className='lg:grid lg:grid-cols-2 lg:gap-4'>
      <div className='mt-4 lg:mt-0 lg:col-span-2'>
        <label className="block text-gray-700">Plant Name:</label>
        <input type="text" value={plantName} 
        className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
        onChange={(e) => setPlantName(e.target.value)} required />
      </div>
      <div className='mt-4 lg:mt-0 lg:col-span-2'>
        <label className="block text-gray-700">Sun Type:</label>
        <select value={sunType} 
        className='w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500'
        onChange={(e) => setSunType(e.target.value)}>
          <option value="Full Sun">Full Sun</option>
          <option value="Part Sun">Part Sun</option>
          <option value="Part Shade">Part Shade</option>
          <option value="Full Shade">Full Shade</option>
        </select>
      </div>
      <div className='mt-4 lg:mt-0'>
        <label className='block text-gray-700'>Watering Frequency:</label>
        <select
            value={waterFreq}
            onChange={(e) => setWaterFreq(e.target.value)}
            className="w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500"
            required
        >
            {waterFreq ? <option value={waterFreq}>{waterFreq}</option> : ""}
            <option value="Daily">Daily</option>
            <option value="Every other day">Every Two Days</option>
            <option value="Twice Weekly">Twice Weekly</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div className='mt-4 lg:mt-0'>
        <label className='block text-gray-700'>Plant Plot:</label>
        <select value={plantPlot} 
        className='w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500'
        onChange={(e) => setPlantPlot(e.target.value)} required>
          <option value="">Select Plot</option>
          {plots.map((plot) => (
            <option key={plot.id} value={plot.name}>{plot.name}</option>
          ))}
        </select>
      </div>
      <div className='mt-4 lg:mt-0'>
        <label className='block text-gray-700'>Fertilizing Frequency:</label>
        <select value={fertFreq} 
        className='w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500'
        onChange={(e) => setFertFreq(e.target.value)}>
          <option value="Two weeks">Two weeks</option>
          <option value="One Month">One Month</option>
          <option value="Two Months">Two Months</option>
          <option value="Three Months">Three Months</option>
          <option value="Six Months">Six Months</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className='mt-4 lg:mt-0'>
        <label className='block text-gray-700'>Pruning Frequency:</label>
        <select value={pruneFreq} 
        className='w-full px-4 py-2 border rounded-md bg-lime-100 focus:outline-none focus:border-lime-500'
        onChange={(e) => setPruneFreq(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Two Months">Two Months</option>
          <option value="Three Months">Three Months</option>
          <option value="Six Months">Six Months</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <button  
      className="mt-4 lg:mt-0 w-full lg:col-span-2 bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      type="submit">Save Plant
      </button>
    </form>
    </div>
  );
};

export default PlantForm;
