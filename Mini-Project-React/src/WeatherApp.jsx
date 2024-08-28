import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox"
import { useState } from "react";

export default function WeatherApp() {
    let[weatherInfo, setWeatherInfo] = useState({
        city: "Indore",
        temp: 25.1,
        tempMax: 25.1,
        tempMin: 25.1,
        humidity: 88,
        feelsLike: 25.96,
        weather: "moderate rain",
        sunlightHours:"12 hours and 44 minutes",
    })

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return(
        <div style={{textAlign : "center"}}>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}