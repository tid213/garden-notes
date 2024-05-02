import React, { useState } from 'react';

function ViewToggle({togglePPN}){

    const [toggle, setToggle] = useState("plants");

        const showToggle = () => {
            if(toggle === "notes"){
                return(
                    <div className="inter flex justify-between bg-white w-60 h-12 mt-24 rounded-lg shadow-md">
                        <div onClick={()=>{setToggle("plants");togglePPN("plants")}}
                        className="w-full cursor-pointer flex justify-center items-center">
                         <p className="text-black">Plants</p>
                        </div>
                        <div onClick={()=>{setToggle("plots");togglePPN("plots")}}
                        className="w-full cursor-pointer flex justify-center items-center">
                         <p className="text-black">Plots</p>
                        </div>
                        <div onClick={()=>{setToggle("notes");togglePPN("notes")}} 
                        className="w-full cursor-pointer flex bg-customOrange rounded-lg justify-center items-center">
                         <p className="text-white">Notes</p>
                        </div>
                    </div>
                )
            } else if (toggle === "plants"){
                return(
                    <div className="inter flex justify-between bg-white w-60 h-12 mt-24 lg:mt-24 rounded-lg shadow-md">
                        <div onClick={()=>{setToggle("plants");togglePPN("plants")}}
                        className="w-full cursor-pointer flex bg-customOrange rounded-lg justify-center items-center">
                         <p className="text-white">Plants</p>
                        </div>
                        <div onClick={()=>{setToggle("plots");togglePPN("plots")}}
                        className="w-full cursor-pointer flex justify-center items-center">
                         <p className="text-black">Plots</p>
                        </div>
                        <div onClick={()=>{setToggle("notes");togglePPN("notes")}} 
                        className="w-full cursor-pointer flex justify-center items-center">
                         <p>Notes</p>
                        </div>
                    </div>
                )
            } else if (toggle === "plots"){
                return(
                    <div className="inter flex justify-between bg-white w-60 h-12 mt-24 lg:mt-24 rounded-lg shadow-md">
                        <div onClick={()=>{setToggle("plants");togglePPN("plants")}}
                        className="w-full cursor-pointer flex justify-center items-center">
                         <p className="text-black">Plants</p>
                        </div>
                        <div onClick={()=>{setToggle("plots");togglePPN("plots")}}
                        className="w-full cursor-pointer flex bg-customOrange rounded-lg justify-center items-center">
                         <p className="text-white">Plots</p>
                        </div>
                        <div onClick={()=>{setToggle("notes");togglePPN("notes")}} 
                        className="w-full cursor-pointer flex justify-center items-center">
                         <p>Notes</p>
                        </div>
                    </div>
                )
            }
        }

        return(
            <div>
                {showToggle()}
            </div>
        )

}

export default ViewToggle;