import React, { useEffect,useState } from 'react'




const api = {
  key: "56a9c1b59e94a977720820c838c997b7",
  base: "https://api.openweathermap.org/data/2.5/",
  units:"metric",

}

const WeatherApp = () => {
  const [weatherData , setWeatherData] = useState({})
  const [cityName , setCityname] = useState("")
  const [searchCityName , setSearchCityName] = useState("")
  
  
  
  useEffect(()=>{
      fetch(`${api.base}forecast?q=${searchCityName}&appid=${api.key}&units=${api.units}&cnt=3`)
    .then((res)=>res.json())
    .then((result)=>{
      setWeatherData(result)
    }).catch((err)=>{
        console.log(err)
    })

  },[searchCityName])
  console.log(weatherData)
    
  // console.log(weatherData)
    //Search Function 
    const searchCity = (e) =>{
      setSearchCityName(cityName)
      // console.log("City Name",weatherData.city.name)
      // console.log("City Temp",weatherData.list.main)


    }


    return (
    <div className='Main'>
      <h1>Weather Application</h1>        
      <div className='d-flex justify-content-center my-5'>
        <input type="text" 
        value={cityName}
        placeholder="Search City Name"
        onChange={(e)=>setCityname(e.target.value)}
        />
      <button className='btn btn-info'
      onClick={searchCity}>
        Search
      </button>

      </div>

      {/* <li>City : {weatherData && weatherData.name}</li>
      <li>Temp : {weatherData && weatherData.main && weatherData.main.temp}</li>
      <li>
        {weatherData &&
        weatherData.weather &&
        weatherData.weather[0] &&
        weatherData.weather[0].main}
      </li> */}
      {/* <p>{weatherData && weatherData.list[main.temp]}</p> */}
    </div>
  )
}

export default WeatherApp 
