const express = require('express');
const compression = require('compression');
const cors = require('cors');
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const path = require('path');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const AWS = require('aws-sdk');

dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const geocodeKey = process.env.REACT_APP_GEOCODE_KEY;
const app = express();

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Middleware to verify Supabase authentication token
const verifySupabaseToken = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
  
    try {
      // Verify and decode the token using Supabase
      const { data, error } = await supabase.auth.getUser(token.replace('Bearer ', ''));

      if (error || !data) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
    
      // If user is authenticated, you can proceed with the request
      req.user = data;
      next();
    } catch (error) {
      console.error('Error verifying Supabase token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

/* Weather Functions and API */
const fetchJSON = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

const getCoordinates = (locationJson) => {
  for (let i = 0; i < locationJson.length; i++) {
    if (locationJson[i].display_name.includes("United States")) {
      return {
        latitude: Math.round(locationJson[i].lat * 10000) / 10000,
        longitude: Math.round(locationJson[i].lon * 10000) / 10000,
      };
    }
  }
  return null;
};

const getWeatherData = async (latitude, longitude) => {
  const weatherData = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
  const weatherDataJson = await weatherData.json();
  const weatherForecast = await fetch(weatherDataJson.properties.forecast);
  const weatherForecastJson = await weatherForecast.json();
  return weatherForecastJson.properties.periods;
};

app.get('/weather/:zip', verifySupabaseToken,  async (req, res) => {
    try {
        const zipCode = req.params.zip;
        const locationResponse = await fetchJSON(`https://geocode.maps.co/search?q=${zipCode}&api_key=${geocodeKey}`);
        const coordinates = getCoordinates(locationResponse);
        const latitude = coordinates?.latitude;
        const longitude = coordinates?.longitude;
        const weatherRes = await getWeatherData(latitude, longitude);
    
        res.json({ weather: weatherRes });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

/* Public NoteBook functions and API */

const fetchUserId = async (shareId) => {
    try {
        const { data, error } = await supabase
          .from('notebooks')
          .select('user_id')
          .eq('share_link', shareId)
      
        if (error) {
          // Log the actual error message returned by Supabase
          console.error('Error querying Supabase:', error.message);
          throw new Error('Error querying Supabase');
        }
      
        if (!data) {
          console.log("No Notebook")
        }
      
        return data

      } catch (error) {
        console.error('Error:', error.message);
      }
};

const fetchUserPlants = async (userId) => {
    try {
        const { data, error } = await supabase
          .from('plants')
          .select('plant_name, plant_image')
          .eq('user_id', userId);
      
        if (error) {
          console.error('Error querying Supabase:', error.message);
          throw new Error('Error querying Supabase');
        }
      
        if (!data || data.length === 0) {
          console.log("No plants found for user:", userId);
          return []; // or any other appropriate response
        }
      
        return data;
      } catch (error) {
        console.error('Error:', error.message);
        throw new Error('Internal Server Error');
      }
};

app.get('/notebook/:id', async (req, res) => {
    const shareId = req.params.id;
    const getUserId = await fetchUserId(shareId);
    const userId = getUserId[0].user_id;
    const plantData = await fetchUserPlants(userId);

    if(plantData){
        res.json({data: plantData})
    } else{
        res.json({data: "API call works no data"})
    }

});

app.use((req, res, next) => {
  const extension = path.extname(req.url);

  if (extension.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp)$/)) {
    const oneYear = 31536000; // 1 year in seconds
    res.setHeader('Cache-Control', `public, max-age=${oneYear}`);
    res.setHeader('Expires', new Date(Date.now() + oneYear * 1000).toUTCString());
  }

  next();
});

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  });
};

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port 8000.`);
});