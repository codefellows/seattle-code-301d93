import './App.css';
import Weather from './Weather'
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      weatherData: []
    }
  }

  handleInput = (e) => {

    this.setState({
      city: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      let cityDataFromAxios = await axios.get(url)

      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;

      this.handleGetWeather(lat, lon);

      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  // TODO: DEFINE A WEATHER HANDLER TO RETREIVE DATA FROM BACKEND
  handleGetWeather = async (lat, lon) => {
    try {
      // TODO: build URL
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}&searchQuery=${this.state.city}`

      // TODO: Use axios to hit my server
      let weatherDataFromAxios = await axios.get(url);

      console.log('WEATHER: ', weatherDataFromAxios.data);
      // TODO: Save that weather data to state
        this.setState({
          weatherData: weatherDataFromAxios.data
        });

    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }


  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.handleSubmit}>
          <label > Pick a City!
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore</button>
          </label>

        </form>


        {/* Ternary - W ? T : F */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <>
              <p>{this.state.cityData.display_name}</p>
              <p> Latitude: {this.state.cityData.lat}</p>
              <p>Longitude: {this.state.cityData.lon}</p>
              
              <Weather weatherData={this.state.weatherData}/>
            </>
        }
      </>
    )
  }
}

export default App;
