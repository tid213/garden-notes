import React, { useState, useEffect } from "react";

function Weather({session, zipCode}){

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
        <div>
            {weatherForecast?.map(function(weather){
                return(
                    <div key={weather.number}>
                        <p>{weather.name}</p>
                        <p>{weather.temperature}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Weather;