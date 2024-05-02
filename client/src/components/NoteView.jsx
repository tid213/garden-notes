import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import closeImage from '../images/x.svg';
import editImage from '../images/edit.svg'
import trashImage from '../images/trash.svg';

function NoteView({noteID, closeButton, editButton}){

    const [noteData, setNoteData] = useState();
    const [editedNote, setEditedNote] = useState(noteData ? noteData[0].note : '');
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(()=>{
        const fetchNoteData = async () =>{
            try{
                if(noteID){
                    const { data, error } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('id', noteID)
                    if (error) {
                        throw error;
                    }
                    setNoteData(data)
                    setEditedNote(data[0].note)
                }
            }catch (error) {
                console.error('Error fetching data:', error.message);
              }
        }
        fetchNoteData();
        
    }, [])

    const refreshPage = ()=>{
        window.location.reload();
       }

    const handleNoteChange = (event) => {
        setEditedNote(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Insert data into the "notes" table
          const { data, error } = await supabase.from('notes').upsert([{id: noteID, note: editedNote}]);
          if (error) {
            throw error; 
          }

        } catch (error) {
          console.error('Error saving note data:', error.message);
        } refreshPage();
      };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', noteID)
            if(error){
                throw error;
            }

        } catch (error){
            console.error('Error saving note data:', error.message);
        } refreshPage();

    }

    console.log(noteData)

    return(
        <div className='w-screen'>
            {noteData ? 
            <div className='relative w-5/6 inter mt-8 lg:mt-8 lg:w-96 md:max-w-md mx-auto p-6 border border-gray-200 rounded-lg shadow-md bg-white'>
            <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>
            <div className='lg:grid lg:grid-col-2 gap-4'>
                <div className='col-span-2 text-xl font-semibold'>
                    <h3>{noteData[0].note_type === "Garden" ? noteData[0].note_type : noteData[0].note_for}</h3>
                </div>
                <div className='col-span-2'>
                    <textarea rows="4" onChange={handleNoteChange} value={editedNote} className="w-full border border-gray-300 rounded-md p-2" ></textarea>
                </div>
            </div>
            <div onClick={handleSubmit}
                className='lg:w-fit col-span-1 w-full m-auto lg:mt-4 lg:p-0 p-1 mt-1 bg-white lg:bg-transparent w-auto cursor-pointer flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                <img src={editImage} className='w-4 h-4'></img>
                <p className='text-normal font-normal text-black p-2'>Save</p>
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
            </div> : ""}
        </div>
    )
}

export default NoteView;