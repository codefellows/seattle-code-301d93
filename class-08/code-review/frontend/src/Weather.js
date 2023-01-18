import React from 'react';


class Weather extends React.Component {
  render(){
    return(
      <>
        <h3>Daily Weather</h3>

        {this.props.weatherData.map((day, indx) => {
          return(
            <>
            <p>{day.date}</p>
            <p>{day.description}</p>
            </>
          )
        })}
      </>
    )
  }
}


export default Weather;