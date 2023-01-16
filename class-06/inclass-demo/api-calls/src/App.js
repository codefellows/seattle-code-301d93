import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pokemonData: [],
      city: '',
      cityData: [],
      error: false,
      errorMessage: ''
    }
  }

  // *** GET POKEMON DATA ***
  handleGetPokemon =  async (e) => {
    e.preventDefault()
    // TODO: make a call out to the Pokemon API - Axios
    let pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon/');

    console.log(pokemonData.data.results);

    // TODO: setState with the data I get back
      this.setState({
        pokemonData: pokemonData.data.results
      });

  }

  // *** CITY DATA DEMO HANDLERS ***

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  // async/await - handles our asynchronous code
  // try/catch - handle our PROMISE - resolves a successful promise or handles our errors on a rejected promise

  getCityData = async (e) => {
    e.preventDefault();

    try {
      // TODO: need use axios to hit LocationIQ - async/await
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      console.log(url);
      let cityDataFromAxios = await axios.get(url)
      // console.log(cityDataFromAxios.data)
      // TODO: save that data to state
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      })


      //  *** FOR YOUR LAB YOU WILL NEED TO GET A MAP IMAGE SRC. Example: ***
    // ** `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=47.6038321,-122.3300624&zoom=10`

    } catch (error) {
      console.log(error);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  render(){
    return(
      <>
        <h1>API Calls</h1>

        <form onSubmit={this.getCityData}>
          <label htmlFor=""> Pick a City!
            <input type="text" onInput={this.handleInput} />
            <button type='submit'>Explore</button>
          </label>

        </form>


        {/* Ternary - W ? T : F */}
        {
          this.state.error
          ? <p>{this.state.errorMessage}</p>
          : <p>{this.state.cityData.display_name}</p>
        }

        {/* <form>
          <button onClick={this.handleGetPokemon}>Gotta catch them all!</button>
        </form>

        <ul>
          {this.state.pokemonData.map((pokemon, idx) => <li key={idx}>{pokemon.name}</li>)}
        </ul> */}
      </>
    )
  }
}

export default App;
