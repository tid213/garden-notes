import React, { useState, useEffect } from "react";

function NoteBook(){

    const [message, setMessage] = useState();

    useState(()=>{
        const fetchData = async () => {
            try {
          
              const response = await fetch('http://localhost:8000/notebook/42069', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
              });
          
              if (response.ok) {
                const data = await response.json();
                setMessage(data.data)
              } else {
                console.error('Request failed:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
        };

        fetchData()
    }, [])

    return(
        <div>
            {message?.map(function(plant, index){
                return(
                    <div key={index}>
                        <p>{plant.plant_name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default NoteBook;