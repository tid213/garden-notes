import tempImage from '../images/temp-image.png';
import React, { useState, useEffect } from 'react';
import PlantView from './PlantView';

function PlantList({session, plantData}){

    const [viewPlant, setViewPlant] = useState(false);
    const [plantID, setPlantID] = useState("");

    const closeButton = (data) => {
        if(data===true){
            setViewPlant(false)
        }
    }

    const plantViewClick = () => {
        if (viewPlant === true){
            setViewPlant(false)
        } else{
            setPlantID(true)
        }
    }

    const plantViewer = () => {
        if(viewPlant === true){
            return(<PlantView session={session} plantID={plantID} closeButton={closeButton} />)
        }
    }

    return(
    <div>
        <div className='absolute mt-24'>{plantViewer()}</div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 ml-4 mr-4">
        {plantData.map(function(data) {
            return(
                <div key={data.id} 
                onClick={()=>{setPlantID(data.id);plantViewClick()}}
                className="bg-customLightGreen p-4 rounded-lg shadow-md cursor-pointer">
                    <div className='lg:h-60 lg:w-60 bg-cover bg-center overflow-hidden flex items-center'>
                    {data.plant_image ? 
                    <img className="w-full h-full object-cover" src={data.plant_image} /> : 
                    <img className='w-full h-full object-cover' src={tempImage}></img>}
                    </div>
                    <p className="text-white font-bold text-xl mt-4">{data.plant_name}</p>
                </div>
            )
        })}
    </div>
    </div>
    )
}

export default PlantList;