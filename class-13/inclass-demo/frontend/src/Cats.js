import { Component } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm';


class Cats extends Component {
  render() {
    return (
      <Container>
        <ListGroup>
          {this.props.cats.map(cat => (
            <Cat cat={cat} deleteCats={this.props.deleteCats} updateCats={this.props.updateCats} />
          ))}
        </ListGroup>
      </Container>
    )
  }
}

class Cat extends Component {
  constructor(props){
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }
  render() {
    return (
      <>
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color} cat
        <Button variant="dark" onClick={()=>{this.props.deleteCats(this.props.cat._id)}}>Delete</Button>
        <Button variant="info" onClick={()=>{this.setState({ showUpdateForm: true })}}>Update</Button>
      </ListGroup.Item> 
      {
        this.state.showUpdateForm && 
        <UpdateCatForm 
          cat={this.props.cat}
          updateCats={this.props.updateCats}
        />
      }
      </>
    )
  }
}

export default Cats;