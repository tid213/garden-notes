import React, { useState, useEffect } from "react";
import closeImage from '../images/x.svg';
import clearDay from '../images/clear-day.svg'
import clearNight from '../images/clear-night.svg'
import partlyCloudyNight from '../images/partly-cloudy-night.svg'
import rain from '../images/rain.svg'
import partlyCloudyDay from '../images/partly-cloudy-day.svg'


function Weather({session, zipCode, closeButton}){

    const [weatherForecast, setWeatherForecast] = useState();
    const [loadingWeather, setLoadingWeather] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = session.access_token;
      
          const response = await fetch(`http://localhost:8000/weather/${zipCode}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setWeatherForecast(data.weather)
            setLoadingWeather(false)
          } else {
            console.error('Request failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };
      fetchData()
    }, [session.access_token, zipCode]);

    const weatherIconPicker = (data) => {
      if(data.name.includes('Tonight') || data.name.includes('Night')){
          if(data.shortForecast.includes('Chance') && data.shortForecast.includes('Rain')){
              return partlyCloudyNight;
          } else if(data.shortForecast.includes('Rain')){
              return rain;
          } else{
              return clearNight;
          }
      } else if(data.shortForecast.includes('Chance')){
          return partlyCloudyDay;
      } else if(data.shortForecast.includes('Showers')){
          return rain;
      }
       else{
          return clearDay;
      }
  }    
  if (loadingWeather === true){
    return(
      <div className="bg-white mt-8 relative rounded-lg shadow-md border border-gray-200 inter p-4">
            <p className="p-8">Loading local weather...</p>
        </div>
    )
  } else {
    return(
        <div className="bg-white mt-8 relative rounded-lg shadow-md border border-gray-200 inter">
          <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-2 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 ' alt="close button"></img></div>
            <div className="grid lg:grid-cols-7 grid-cols-3 p-4 gap-4 lg:gap-8">
            {weatherForecast?.slice(0, 7).map(function(weather){
                return(
                    <div className="flex flex-col justify-center items-center" key={weather.number}>
                        <p>{weather.name}</p>
                        <img className="w-12 h-12" src={weatherIconPicker(weather)} alt="current weather icon"></img>
                        <p className="text-xs">{weather.shortForecast}</p>
                        <p>{weather.temperature}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
  }
};

export default Weather;