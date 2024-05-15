import React, { useState, useEffect } from "react";
import closeImage from '../images/x.svg';


function Weather({session, zipCode, closeButton}){

    const [weatherForecast, setWeatherForecast] = useState();

    useEffect(() => {
      fetchData()
    }, []);

    const fetchData = async () => {
        try {
          const token = session.access_token;
      
          const response = await fetch('http://localhost:8000/weather/85296', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setWeatherForecast(data.weather)
          } else {
            console.error('Request failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };
      
    return(
        <div className="bg-white mt-8 relative">
          <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>
            <div className="grid lg:grid-cols-7 p-4 gap-4">
            {weatherForecast?.map(function(weather){
                return(
                    <div key={weather.number}>
                        <p>{weather.name}</p>
                        <p>{weather.temperature}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Weather;