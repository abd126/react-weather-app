import React, { useEffect,useState } from 'react'

const WeatherApp = () => {
  const [weatherData , setWeatherData] = useState({})
  const [cityName , setCityname] = useState()
  const [searchCityName , setSearchCityName] = useState('')
  
  
  
  useEffect(()=>{
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=56a9c1b59e94a977720820c838c997b7&units=metric`)
    .then((res)=>res.json())
    .then((result)=>{
      setWeatherData(result)
    }).catch((err)=>{
        console.log(err)
    })

  },[cityName])
  console.log(weatherData)
  //Search Function 

    const searchCity = () =>{
      setSearchCityName(cityName)
    }
    return (
    <div className='Main'>
      <h1>Weather App</h1>        
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
    </div>
  )
}

export default WeatherApp 
