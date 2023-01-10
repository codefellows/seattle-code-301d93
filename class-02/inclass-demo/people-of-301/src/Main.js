import React from 'react';
import Person from './Person';
import data from './data/data.json'
import './Main.css'

class Main extends React.Component{
  render(){

    return (
      <>
      <main>
        {data.map((person, index) => {
          return <Person name={person.name} imageURL={person.imageURL} key={index} />
        })}

      </main>
      </>

    )
  }

}

export default Main;