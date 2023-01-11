import React from 'react';
import './Person.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'


class Person extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      waves: 0,
      helpMe: false,
    }
  }

  // ** METHOD TO UPDATE STATE FOR EACH PERSON ** This is called on the onclick on p element
  handleWave = () => {
    this.setState({
      waves: this.state.waves + 1
    });
  }

  needHelp = () => {
    this.setState({
      helpMe: true
    });
  }

  gotHelp = () => {
    this.setState({
      helpMe: false
    });
  }

  handleNameClick = () => {
    this.props.handleOpenModal(this.props.name)
  }

  render(){
    return(
      <>
      <Col>
        <Card>
          <Card.Title onClick={this.handleNameClick}>{this.props.name}</Card.Title>
          <p> 👋{this.state.waves} Greetings</p>
          <p onClick={this.handleWave}>Say Hello!</p>
          <Card.Img src={this.props.imageURL} alt={this.props.name} onClick={this.props.addHearts} />
          <Button onClick={this.needHelp} variant="danger">Help!</Button>
          <Button onClick={this.gotHelp} variant="success">Got Help!</Button>

          {/* TERNARY WTF - WHAT ? TRUE : FALSE  */}
          <div>{this.state.helpMe ? 'I need help' : ''}</div>
        </Card>
      </Col>
      </>
    )
  }
}

export default Person;