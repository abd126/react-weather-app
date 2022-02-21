import React, { useEffect, useState } from 'react'
import './style.css'
import { Search , BsFillGeoAltFill } from 'react-bootstrap-icons';
import {ImLocation} from 'react-icons/im'





const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({})
  const [cityName, setCityname] = useState("London")
  const [searchCityName, setSearchCityName] = useState("")
  const [currentLocation ,setCurrentLocation] = useState({})

  // Set Current Location

  useEffect(()=>{
    const getLocation = () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          (posotion)=>{
            setCurrentLocation(posotion)
            setCityname("")
          },
          (error)=>{
            console.log("error",error)
            setSearchCityName(cityName)
          }
        )
      }
    }
    getLocation()
  },[])
  
  
  
  useEffect(() => {
    const api = {
      key: "56a9c1b59e94a977720820c838c997b7",
      base: "https://api.openweathermap.org/data/2.5/",
      units: "metric",
    
    }
    let searchQuery = currentLocation && currentLocation.coords
    ?`lat=${currentLocation.coords.latitude}&lon=${currentLocation.coords.longitude}`
    :`q=${searchCityName ? searchCityName : cityName}`



    
    fetch(`${api.base}weather?${searchQuery}&appid=${api.key}&units=${api.units}&cnt=3`)
      .then((res) => res.json())
      .then((result) => {
        setWeatherData(result)
      }).catch((err) => {
        console.log(err)
      })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCityName, currentLocation])
  console.log(currentLocation)
 
 
 
  //Search Function 
  const searchCity = (e) => {
    setSearchCityName(cityName)

  }


  return (
    <div className='Main container'>
      <h1>Weather App</h1>
      <div className='Search-component'>
        <div className='d-flex justify-content-center my-5'>

          <input type="text"
            value={cityName}
            placeholder="Search City Name"
            onChange={(e) => setCityname(e.target.value)}
            className="w-50"
          />

          <button className='btn btn-info'
            onClick={searchCity}>
            <Search />
          </button>
        </div>
      </div>

      <div className='detail-component'>

        <div className='Temp-content'>

          <h2 className=''>
            <ImLocation />
            {weatherData && weatherData.name}</h2>


          <div className="temprature">

            {weatherData &&
              weatherData.weather &&
              weatherData.weather[0] &&
              <p>{weatherData.weather[0].main}</p>
              &&
              <img className="city-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].main} />
            }

            {weatherData &&
              weatherData.weather &&
              weatherData.weather[0] &&
              <p>{weatherData.weather[0].main}</p>
            }
          </div>
            <div className='temprature-reading'>
            <h1 className='temprature-heading'>{weatherData && 
          weatherData.main && weatherData.main.temp}</h1>
          <span className='symbol'>°C</span>
            </div>
          <h3>
            feels Like 
          {weatherData &&
              weatherData.main &&
              weatherData.main.feels_like}
          </h3>
        </div>


      </div>




    </div>
  )
}

export default WeatherApp 
