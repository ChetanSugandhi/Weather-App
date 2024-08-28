import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import "./InfoBox.css";

export default function InfoBox({ info }) {

    let COLD_URL = "https://wallpaperaccess.com/full/2942813.jpg";
    let HOT_URL = "https://tse1.mm.bing.net/th?id=OIP._6UW1704oYjKYfVcf84iMgHaEc&pid=Api&P=0&h=180";
    let RAIN_URL = "https://media.premiumtimesng.com/wp-content/files/2021/08/freepressjournal_2021-07_eac3ac3c-ea97-47aa-a468-ace529d42d50_rain_raining_raindrops_wet_spring_summer_fall_weather_generic.jpg";

    // Default info check to prevent crashes
    if (!info) {
        return <p>Loading...</p>;
    }

    // Determine background image
    const backgroundImage = info.humidity > 80 ? RAIN_URL : info.temp > 15 ? HOT_URL : COLD_URL;

    return (
        <div className='InfoBox' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className='overlay'>
                <div className='infoContainer'>
                    <Typography gutterBottom variant="h4" component="div" className='cityHeader'>
                        {info.city}&nbsp;
                        {info.humidity > 80 ? <ThunderstormIcon /> : info.temp > 15 ? <WbSunnyIcon /> : <AcUnitIcon />}
                    </Typography>
                    <Typography variant="body1" component={"div"} className='weatherDetails'>
                        <p><b>Temperature:</b> {info.temp}&deg;C</p>
                        <p><b>Weather:</b> {info.weather?.toUpperCase()}</p>
                        <p><b>Humidity:</b> {info.humidity}%</p>
                        <p><b>Min Temp:</b> {info.tempMin}&deg;C</p>
                        <p><b>Max Temp:</b> {info.tempMax}&deg;C</p>
                        <p><b>Sunlight Hours:</b> {info.sunlightHours}</p>
                        <p><b>Feels Like:</b> The temperature in <i>{info.city}</i> is <i>{info.temp}&deg;C</i> but it feels like <i>{info.feelsLike}&deg;C</i></p>
                    </Typography>
                </div>
            </div>
        </div>
    );
}
