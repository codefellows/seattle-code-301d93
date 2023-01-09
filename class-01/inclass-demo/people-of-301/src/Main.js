import React from 'react';
import Person from './Person'

class Main extends React.Component{
  render(){
    return (
      <>
        <h3>Hello Class!</h3>
        <Person name="Jordan" />
        <Person name="Ken" />
        <Person name="Marlon" />
        <Person name="Tyler"/>
        <Person name="Marco"/>
        <Person name="Tre" />
        {/* <HornedBeast title="Uniwal" description="" image_url="" />  */}
      </>

    )
  }

}

export default Main;