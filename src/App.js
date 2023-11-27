import React, {useEffect, useState} from 'react';

function App() {

  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch('http://localhost:4000/')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setWeatherData(responseData)
      } catch( error ) {
        setWeatherData({error: error.message})
      }
    }

    getWeatherData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const data = {
        cityname : event.target.cityname.value
      }
      const requestOptions = {
        method : 'POST',
        body : JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('http://localhost:4000/', requestOptions)
      const responseData = await response.json()
      if(!response.ok) {
        throw new Error(responseData.message)
      } else {
        setWeatherData(responseData)
      }
    } catch (error) {
      setWeatherData({error: error.message})
    }
  }


  return (
    <div className="App">
      <div className="container">
          <div className="row">
              <div className="col-md-6 mx-auto text-center bg-primary mt-5 p-5 rounded">
                  {weatherData.error ? null : <h1 id="location">{weatherData.city}</h1>}
                  <ul className="list-group mt-3">
                      <li className="list-group-item" id="description">{weatherData.description}</li>
                      <li className="list-group-item" id="temp">{weatherData.temp}</li>
                  </ul>
                  <h1 className="mt-3">Change city</h1>
                  <form id="change-city" onSubmit={handleSubmit}>
                      <div className="form-group">
                          <label htmlFor="city-name">City</label>
                          <input type="text" id="city-name" className="form-control" name="cityname"/>
                      </div>
                      <input type="submit" className="btn btn-grey" value="Save changes"/>
                  </form>
                      {weatherData.error && <>
                        <div className="alert alert-danger" role="alert">
                            {weatherData.error}
                        </div>
                        <a className="btn btn-secondary" text="white" href="/" role="button">
                            Try again
                        </a>
                      </>
                      }
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
