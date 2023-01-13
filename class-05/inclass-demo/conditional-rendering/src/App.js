import React from 'react';
import Location from './Location';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('this was submitted')
    this.setState({
      locationData: true
    })
    // make a call out to the LocationIQ API
  }

  handleInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }
  

  render() {
    
    return (
      <>
        <h1>Forms in React</h1>
        <main>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor=""> Pick a city:
              <input type="text" onInput={this.handleInput}/>
            </label>
            <button type="submit">Explore!</button>
          </form>
        </main>


        {/* TERNARY EXAMPLE -- WTF   WHAT ? TRUE : FALSE  */}
       { this.state.locationData ? <Location /> : null }

       {/* conditional rendering with a short circuit  */}
       {this.state.locationData && <Location />}

       {/* {this.state.error && <Error />} */}
      </>
    )
  }
}

export default App;


