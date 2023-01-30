
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button'



class Bestbooks extends React.Component {

// state: selectedbook: {}




  render() {

    return (
      <>

        <title>Bestbooks</title>
        {/* <Carousel slide={}>
        {this.state.books.map}
      </Carousel> */}
        {this.props.books.length ?
          <Carousel>
            {this.props.books.map(book => (

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./bookimg.jpg"
                  alt="Carousel background"
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <Button onClick= {() =>{this.props.deleteBooks(book._id)}}>Delete</Button>
                  <Button>Update</Button> 
                  {/* ^^^^ Button's job is to open a modal */}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          :
          <h3>No books found</h3>
  }
        
      </>
    )
  }
}

export default Bestbooks;