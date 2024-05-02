import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import tempImage from '../images/temp-image.png';
import DateSelect from './DateSelect';
import ImageForm from './ImageForm';
import editImage from '../images/edit.svg'
import shearsImage from '../images/shears.png';
import fertilizerImage from '../images/fertilizer.png';
import AddImageIcon from '../images/add-image.png';
import trashImage from '../images/trash.svg';
import closeImage from '../images/x.svg';

function PlantView({session, plantID, closeButton, editButton, bgColor}){

    const [plantData, setPlantData] = useState();
    const [dateAndImageView, setDateAndImageView] = useState("image");
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(()=>{
        const fetchPlantData = async () =>{
            try{
                if(plantID){
                    const { data, error } = await supabase
                    .from('plants')
                    .select('*')
                    .eq('id', plantID)
                    if (error) {
                        throw error;
                    }
                    setPlantData(data)
                }
            }catch (error) {
                console.error('Error fetching data:', error.message);
              }
        }
        fetchPlantData();
    }, [])

    const dateAndImage = (data) => {
        if(data === "fertilize"){
            setDateAndImageView("fertilize")
        } else if(data === "prune"){
            setDateAndImageView("prune")
        } else if(data === "close"){
            setDateAndImageView("image")
        } else if(data === "upload"){
            setDateAndImageView("upload")
        }
    }

    const imageDisplay = () => {
        if(plantData[0].plant_image){
            return(<img src={plantData[0].plant_image}></img>)
        } else{
            return(<img src={tempImage}></img>)
        }
    }

    const dateOrUpload = () => {
        if(dateAndImageView === "prune" || dateAndImageView === "fertilize"){
            return(<DateSelect plantId={plantID}  pruneOrFert={dateAndImageView} close={dateAndImage} />)
        } else if(dateAndImageView === "upload"){
            return(<ImageForm close={dateAndImage} imageForId={plantID} imageFor={"plant"} />)
        }
    }

    const refreshPage = ()=>{
        window.location.reload();
       }

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase
            .from('plants')
            .delete()
            .eq('id', plantID)
            if(error){
                throw error;
            }

        } catch (error){
            console.error('Error saving note data:', error.message);
        } refreshPage();

    }

    return(
        <div>
            {plantData ? 
                <div className={`relative w-full inter mt-8 lg:mt-8 lg:max-w-4xl max-w-sm md:max-w-md mx-auto p-6 border border-gray-200 rounded-lg shadow-md bg-white`}>
                <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>
                <div className='lg:grid grid-cols-4 lg:grid-cols-9 grid-flow-row gap-4'>
                        <div className='lg:col-span-7'>
                            <h1 className="text-2xl font-bold inter text-customBrown">
                                {plantData[0].plant_name}<b className="text-customOrange">.</b>
                                <b className="text-customMidGreen text-xl font-normal">
                                    plot/{plantData[0].plant_plot}
                                </b>
                            </h1>
                        </div>
                        <div className='lg:col-span-4 lg:w-96 lg:h-96 bg-transparent lg:flex bg-cover bg-center overflow-hidden flex justify-center items-center'>
                            {dateAndImageView != "image" ? 
                                dateOrUpload() : imageDisplay()}
                        </div>
                        <div className='lg:col-span-3'>
                            <div className='grid grid-cols-2 lg:grid-cols-none mt-4'>
                                <div>
                                    <p className='font-bold'>Water frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].water_freq}</p>
                                    <p className='font-bold'>Last fertilized:</p><p className='lg:mb-4 mb-2'>{plantData[0].fertilize_date ? plantData[0].fertilize_date : "Edit plant to add" }</p>
                                    <p className='font-bold'>Last pruned:</p><p className='lg:mb-4 mb-2'>{plantData[0].prune_date ? plantData[0].prune_date : "Edit plant to add" }</p>
                                </div>
                                <div>
                                    <p className='font-bold lg:hidden'>Plot location:</p><p className='lg:mb-4 mb-2 lg:hidden'>{plantData[0].plant_plot}</p>
                                    <p className='font-bold'>Fertilize frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].fert_freq ? plantData[0].fert_freq : "Edit plant to add"}</p>
                                    <p className='font-bold'>Prune frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].prune_freq ? plantData[0].prune_freq : "Edit plant to add"}</p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-2 h-fit flex justify-center lg:justify-start lg:flex-nowrap flex-wrap lg:flex lg:flex-col gap-4 lg:border-l-2 lg:border-gray-100'>
                            <div onClick={()=>editButton("plant")}
                                className='lg:w-fit w-full m-auto lg:mt-1 lg:p-0 p-1 mt-1 bg-white lg:bg-transparent w-auto cursor-pointer flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={editImage} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Edit</p>
                            </div>
                            <div onClick={()=>setDateAndImageView("prune")} 
                                className='lg:w-fit w-full m-auto lg:p-0 p-1 mt-1 bg-white lg:bg-transparent cursor-pointer flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={shearsImage} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Prune</p>
                            </div>
                            <div onClick={()=>setDateAndImageView("fertilize")}
                                className='lg:w-fit w-full m-auto lg:p-0 p-1 mt-1 cursor-pointer bg-white lg:bg-transparent flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={fertilizerImage} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Fertilize</p>
                            </div>
                            <div onClick={()=>setDateAndImageView("upload")} 
                                className='lg:w-fit w-full m-auto lg:p-0 p-1 mt-1 cursor-pointer bg-whitelg:bg-transparent flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={AddImageIcon} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Image</p>
                            </div>
                            <div onClick={() => setShowConfirmation(true)}
                                className='lg:w-fit col-span-1 w-full m-auto lg:mt-1 lg:p-0 p-1 mt-1 bg-white lg:bg-transparent w-auto cursor-pointer flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={trashImage} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Delete</p>
                            </div>
                            {showConfirmation && (
                                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                                    <div className="bg-white p-8 rounded-md shadow-lg">
                                        <p>Are you sure you want to delete?</p>
                                        <div className="flex justify-end mt-4">
                                            <button onClick={handleDelete} className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md">Yes</button>
                                            <button onClick={() => setShowConfirmation(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">No</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                </div>
            </div>: ""}
        </div>
        )
}

export default PlantView;