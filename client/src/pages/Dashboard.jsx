import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'
import AccountForm from "../components/AccountForm";
import PlantForm from "../components/PlantForm";
import PlotForm from "../components/PlotForm";
import NoteForm from "../components/NoteForm";
import loadingImg from '../images/bouncing-circles.svg';
import tempImage from '../images/temp-image.png';
import tempPlotImage from '../images/garden-plot.png';
import PlantView from "../components/PlantView";
import ViewToggle from "../components/ViewToggle";
import PlotView from "../components/PlotView";
import NoteView from "../components/NoteView";
import Weather from '../components/Weather';
import NavBar from '../components/NavBar';

function Dashboard ({session}) {

    const [fullyRegistered, setFullyRegistered] = useState(false);
    const [regCheck, setRegCheck] = useState(true);
    const [userInfo, setUserInfo] = useState();
    const [plantData, setPlantData] = useState();
    const [loadingPlantData, setLoadingPlantData] = useState(true);
    const [plotData, setPlotData] = useState();
    const [loadingPlotData, setLoadingPlotData] = useState(true);
    const [noteData, setNoteData] = useState();
    const [loadingNoteData, setLoadingNoteData] = useState(true);
    const [formView, setFormView] = useState("");
    const [toggle, setToggle] = useState("plants")
    const [viewPlantID, setViewPlantID] = useState("");
    const [viewPlotID, setViewPlotID] = useState("");
    const [viewNoteID, setViewNoteID] = useState("");
    const colors = ["bg-lime-200","bg-lime-200", "bg-amber-200", "bg-orange-200"];
    const [colorIndices, setColorIndices] = useState([]);
    

    useEffect(()=>{
        const fetchUserInfo = async () => {
            try {
                const { data, error } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id);
        
                if (error) {
                  throw error;
                }
                if(data[0].username != null){
                    setTimeout(function(){
                        setFullyRegistered(true)
                        setRegCheck(false)
                    }, 1000)
                    
                }
    
                setUserInfo(data || []);
              } catch (error) {
                console.error('Error fetching plants:', error.message);
              }
        };
    
        const fetchPlantData = async () => {
            try {
                setLoadingPlantData(true);
                const { data, error } = await supabase
                  .from('plants')
                  .select('*')
                  .eq('user_id', session.user.id);
        
                if (error) {
                  throw error;
                }
    
                setPlantData(data || []);
                setLoadingPlantData(false);
              } catch (error) {
                console.error('Error fetching plants:', error.message);
                setLoadingPlantData(false);
              }
        };
    
        const fetchPlotData = async () => {
            try {
                setLoadingPlotData(true);
                const { data, error } = await supabase
                  .from('plots')
                  .select('*')
                  .eq('user_id', session.user.id);
        
                if (error) {
                  throw error;
                }
    
                setPlotData(data || []);
                setLoadingPlotData(false);
              } catch (error) {
                console.error('Error fetching plants:', error.message);
                setLoadingPlotData(false);
              }
        };
    
        const fetchNoteData = async () => {
            try {
                setLoadingNoteData(true);
                const { data, error } = await supabase
                  .from('notes')
                  .select('*')
                  .eq('user_id', session.user.id);
        
                if (error) {
                  throw error;
                }
    
                setNoteData(data || []);
                setLoadingNoteData(false);
              } catch (error) {
                console.error('Error fetching plants:', error.message);
                setLoadingNoteData(false);
              }
        };

        fetchUserInfo();
        fetchPlantData();
        fetchPlotData();
        fetchNoteData();
    }, [session.user.id])


    // Generate colors for note divs

    useEffect(() => {
        const generateRandomColorIndices = () => {
            if(toggle === "notes"){
                const randomIndices = Array.from({ length: noteData.length }, () => Math.floor(Math.random() * colors.length));
                setColorIndices(randomIndices);
            } else if(toggle === "plants" && plantData){
                const randomIndices = Array.from({ length: plantData.length }, () => Math.floor(Math.random() * colors.length));
                setColorIndices(randomIndices);
            } else if(toggle === "plots"){
                const randomIndices = Array.from({ length: plotData.length }, () => Math.floor(Math.random() * colors.length));
                setColorIndices(randomIndices);
            }
        };
        
        generateRandomColorIndices();
    }, [noteData, plantData, plotData, toggle, colors.length]);

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
    };

    // Nav bar functions 

    const navbarFormToggle = (data) => {
        setFormView(data);
    }

    //Form buttons

    const closeButton = (data) => {
        if(data === true){
            setFormView("")
        }
    }

    const editButton = (data) => {
        if(data === "plant" || data === "note" || data === "plot"){
            setFormView("edit " + data)
        } else if(data === "close edit plant"){
            setFormView("view plant")
        } else if(data === "close edit plot"){
            setFormView("view plot")
        }
    };

    // Set Plant, Plot and Note data and views

    const setPlantID = (data) => {
        if(data){
            setViewPlantID(data);
            setFormView("view plant");
            window.scrollTo(0, 0);
        }
    };

    const setPlotID = (data) => {
        if(data){
            setViewPlotID(data);
            setFormView("view plot");
            window.scrollTo(0, 0);
        }
    };

    const setNoteID = (data) => {
        if(data){
            setViewNoteID(data);
            setFormView("view note");
            window.scrollTo(0, 0);
        }
    };

    const togglePPN = (data) => {
        setToggle(data);
    };

    //Plants, Plots and Notes displays

    const showPPN = () => {
        if(toggle === "plants" && !loadingPlantData){
            return(
                <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 ml-4 mr-4">
                    {plantData.slice().reverse().map(function(data, index) {
                            return(
                                <div key={data.id} 
                                onClick={()=>{setPlantID(data.id)}}
                                className={`p-4 rounded-sm shadow-md cursor-pointer bg-white`}>
                                    <div className='lg:h-52 lg:w-52 h-40 w-38 bg-cover bg-center overflow-hidden flex items-center'>
                                    {data.plant_image ? 
                                    <img className="w-full h-full object-cover overflow-hidden" src={data.plant_image} alt="User's plant" /> : 
                                    <img className='w-full h-full object-cover overflow-hidden' src={tempImage} alt="place holder for user's plant"></img>}
                                    </div>
                                    <p className="text-black font-medium text-xl mt-4">{data.plant_name}</p>
                                </div>
                            )
                        })}
                </div>
            )
        } else if(toggle === "plots" && !loadingPlotData){
            return(
                <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 ml-4 mr-4">
                    {plotData.slice().reverse().map(function(data, index) {
                            return(
                                <div key={data.id} 
                                onClick={()=>{setPlotID(data.id);}}
                                className={`p-4 rounded-sm shadow-md cursor-pointer bg-white`}>
                                    <div className='lg:h-52 lg:w-52 h-40 w-38 bg-cover bg-center overflow-hidden flex items-center'>
                                    {data.plot_image ? 
                                    <img className="w-full h-full object-cover overflow-hidden" src={data.plot_image} alt="User's plot" /> : 
                                    <img className='w-full h-full object-cover overflow-hidden' src={tempPlotImage} alt="place holder for user's plot"></img>}
                                    </div>
                                    <p className="text-black font-medium text-xl mt-4">{data.name}</p>
                                </div>
                            )
                        })}
                </div>
            )
        } else if(toggle === "notes" && !loadingNoteData){
            return(
                <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-4 gap-4 ml-4 mr-4">
                    {noteData.slice().reverse().map(function(data, index) {
                        return (
                            <div key={data.id} 
                                onClick={() => setNoteID(data.id)}
                                className={`lg:h-52 lg:w-52 min-h-40 w-38 inter p-4 rounded-sm shadow-md cursor-pointer ${colors[colorIndices[index]]}`}>
                                 <p className="text-black min-h-28 text-sm p-1 rounded-lg  mt-4">{data.note}</p>
                                <p className="text-black ">
                                    {data.note_type === "Garden" ? data.note_type : data.note_for}
                                    <span> Note</span>
                                </p>
                                <p className="text-xs">{formatDate(data.created_at)}</p>
                            </div>
                        );
                    })}
                </div>
            )
        }
    };

    //Shows Plant, Plot and Note components

    const viewContainer = () => {
        if(formView === "add plant"){
            return(<PlantForm session={session} editButton={editButton} closeButton={closeButton} />)
        }  else if(formView === "add note"){
            return(<NoteForm session={session} closeButton={closeButton} />)
        } else if(formView === "add plot"){
            return(<PlotForm session={session} editButton={editButton} closeButton={closeButton} />)
        } else if(formView === "edit account"){
            return(<AccountForm session={session} closeButton={closeButton} />)
        } else if(formView === "edit plant"){
            return(<PlantForm session={session} editButton={editButton} closeButton={closeButton} plantId={viewPlantID} />)
        } else if(formView === "edit plot"){
            return(<PlotForm session={session} editButton={editButton} closeButton={closeButton} plotId={viewPlotID} />)
        } else if(formView === "view plant"){
            return(<PlantView key={viewPlantID} session={session} plantID={viewPlantID} editButton={editButton} closeButton={closeButton} />)
        } else if(formView === "view plot"){
            return(<PlotView key={viewPlotID} session={session} plotID={viewPlotID} editButton={editButton} closeButton={closeButton} />)
        } else if(formView === "view note"){
            return(<NoteView noteID={viewNoteID} closeButton={closeButton} editButton={editButton} />)
        } else if(formView === "show weather"){
            return(<Weather session={session} closeButton={closeButton} zipCode={userInfo[0].zip_code} />)
        }
    };

    if(fullyRegistered===false){
        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50">
                {regCheck ? (<img src={loadingImg} className="w-16 h-16" alt="loading dots bouncing"></img>):(<AccountForm session={session}/>)}
            </div>
        )
    } else{
        return( 
            <div className="min-h-screen flex flex-col items-center bg-slate-50">
                <NavBar navbarFormToggle={navbarFormToggle} userSignedIn={true} />
                <div className="absolute top-12">{viewContainer()} </div>
                <div className="">{<ViewToggle togglePPN={togglePPN} />}</div>
                <div className="mt-4">
                    <div>{showPPN()}</div>
                </div> 
            </div>
        )
    }
}

export default React.memo(Dashboard);