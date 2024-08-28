import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "519a8bab643e83ddff3629a7b1c9da13";

    let getWeatherInfo = async () => {          // API Call 
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);

            // Convert sunlight hours from seconds to hours and minutes
            let sunlightSeconds = jsonResponse.sys.sunset - jsonResponse.sys.sunrise;
            let sunlightHours = Math.floor(sunlightSeconds / 3600);
            let sunlightMinutes = Math.floor((sunlightSeconds % 3600) / 60);

            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                windSpeed: jsonResponse.wind.speed,         // Added wind speed
                sunlightHours: `${sunlightHours} hours and ${sunlightMinutes} minutes`, // Human-readable format
            }
            console.log(result);
            return result;
        }catch(err)       {
            throw err;
        }
       
    }



    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        }
        catch(err){
            setError(true);
        }

    }
    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit} >
                <TextField id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}

                />
                <br /><br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
            </form>

            {error && <p style={{color:"red", fontSize: "2rem"}}>No Such Place Exists in API !</p>}
        </div>
    );
}