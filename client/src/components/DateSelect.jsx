import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function DateSelect({plantId, pruneOrFert, close}){

    const [date, setDate] = useState(null)

    const refreshPage = ()=>{
        window.location.reload();
     }
    
    const submitFertilizeDate = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('plants')
        .update({fertilize_date: date})
        .eq('id', plantId)
        if(error){
            console.log(error)
        }
          refreshPage()
    }

    const submitPruneDate = async (event) => {
        event.preventDefault();
        const { error } = await supabase
        .from('plants')
        .update({prune_date: date})
        .eq('id', plantId)
        if(error){
            console.log(error)
        }
          refreshPage()
    }

    if (pruneOrFert === "prune") {
        return (
            <div className=" p-4 ml-4 mr-4 border border-customMidGreen bg-white rounded-lg shadow-md">
                <div className="form-title mt-4">
                    <p className="inter text-xl font-normal text-black">Select last time plant was pruned</p>
                </div>
                <form onSubmit={submitPruneDate} className="mt-4">
                    <label htmlFor="prune_date" className="block">Date:</label>
                    <input type="date" id="prune_date" name="prune_date" onChange={(e) => setDate(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2 mt-1"/>
                    <button type="submit" className="mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Set Date</button>
                    <div className="close-button cursor-pointer mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" onClick={() => close('close')}>Close</div>
                </form>
            </div>
        );
    } else {
        return (
            <div className="p-4 ml-4 mr-4 border border-customMidGreen bg-white rounded-lg shadow-md">
                <div className="form-title mt-4">
                    <p className="inter text-xl font-normal text-black">Select last time plant was fertilized:</p>
                </div>
                <form onSubmit={submitFertilizeDate} className="mt-4">
                    <label htmlFor="fertilize_date" className="block">Date:</label>
                    <input type="date" id="fertilize_date" name="fertilize_date" onChange={(e) => setDate(e.target.value)} className="block w-full border border-gray-300 rounded-md p-2 mt-1"/>
                    <button type="submit" className="mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Set Date</button>
                    <div className="close-button cursor-pointer mt-4 w-full bg-customOrange hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline" onClick={() => close('close')}>Close</div>
                </form>
            </div>
        );
    }
    
}

export default DateSelect;