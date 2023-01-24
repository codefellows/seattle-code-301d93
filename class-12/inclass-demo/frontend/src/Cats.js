import { Component } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap'


class Cats extends Component {
  render() {
    return (
      <Container>
        <ListGroup>
          {this.props.cats.map(cat => (
            <Cat cat={cat} deleteCats={this.props.deleteCats}/>
          ))}
        </ListGroup>
      </Container>
    )
  }
}

class Cat extends Component {
  render() {
    return (
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color} cat
        <Button onClick={()=>{this.props.deleteCats(this.props.cat._id)}}>Delete</Button>
      </ListGroup.Item> 
    )
  }
}

export default Cats;