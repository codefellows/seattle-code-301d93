import React from 'react';
import Person from './Person';
import data from './data/data.json'
import './Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Main extends React.Component {
  render() {
    return (
      <>
        <main>
          <Container>
            <Row xs={1} sm={2} md={3} lg={4}>
              {data.map((person, index) => {
                return (
                <Person 
                  name={person.name} 
                  imageURL={person.imageURL} 
                  key={index}
                  addHearts={this.props.addHearts}
                  handleOpenModal={this.props.handleOpenModal}
                />
              )})}
            </Row>
          </Container>
        </main>
      </>

    )
  }

}

export default Main;