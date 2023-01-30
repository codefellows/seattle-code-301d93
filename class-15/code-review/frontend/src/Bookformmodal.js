import React, { Component } from "react";

import Modal from 'react-bootstrap/Modal';
// import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { ModalBody } from "react-bootstrap";





export default class Bookformmodal extends Component {
  handleBookSubmit = (event) => {
    event.preventDefault();

    let newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value
    }
    this.props.postBook(newBook);
    this.props.closeModal();
  }


  render() {
    return (
      <>

        <Modal show={this.props.show} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>closeModal</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleBookSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
              <Form.Control type = "text" />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
              <Form.Control type = "text" />
              </Form.Group>
            </Form>
          </Modal.Body>
          {/* <Container > */}
            {/* <Form onSubmit={this.handleBookSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" defaultValue={this.props.books} /> */}
              {/* </Form.Group> */}
              {/* <Form.Group controlId="descripton">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" defaultValue={this.props.book.description} />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>status</Form.Label>
                <Form.Control type="text" defaultValue={this.props.book.status} />
              <Button type="submit">Update Books</Button>
              </Form.Group> */}
            {/* </Form> */}
          {/* </Container> */}
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}

        </Modal>
      </>
    );
  }


}
