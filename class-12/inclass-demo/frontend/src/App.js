import React from 'react';
import './App.css';
import axios from 'axios';
import Cats from './Cats.js';
import { Container, Form, Button } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    }
  }

  getCats = async () => {
    try {
      // TODO: use axios to call out to my server get all the cats from the DB
      let url = `${process.env.REACT_APP_SERVER}/cats`

      let catData = await axios.get(url);

      this.setState({
        cats: catData.data
      });

    } catch (error) {
      console.log(error.response)
    }
  }

  deleteCats = async (id) => {
    try {
      // TODO: use axios to send the ID to the server on the path param
      let url = `${process.env.REACT_APP_SERVER}/cats/${id}`

      await axios.delete(url);

      // TODO: update state to remove the deleted cat
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);

      this.setState({
        cats: updatedCats
      });

    } catch (error) {
      console.log(error.message)
    }
  }


  // *** Create cat 2 handlers: 1 to handle the form submission & 1 to post to DB ***

  handleCatSubmit = (event) => {
    event.preventDefault();

    // TODO: BUILD A CAT OBJECT FROM MY FORM VALUES
    let newCat = {
      name: event.target.name.value,
      color: event.target.color.value,
      spayNeuter: event.target.spayNeuter.checked,
      location: event.target.location.value
    }
    console.log('new Cat from form>>>', newCat);

    // TODO: post my cat to DB using my 2nd handler
    this.postCats(newCat);
  }

  // *** 2nd Handler to post to DB

  postCats = async (catObj) => {
    try {
      // TODO: Create the url for axios to send cat obj to server
      let url = `${process.env.REACT_APP_SERVER}/cats`;

      // 2 args on a post: 1st is the url, 2nd is the data to send
      let createdCat = await axios.post(url, catObj);

      this.setState({
        cats: [...this.state.cats, createdCat.data]
      })


      // TODO: receive a created cat and add it to state
    } catch (error) {
      console.log(error.message);
    }
  }

  // REACT LIFECYCLE METHOD

  componentDidMount() {
    this.getCats();
  }


  render() {
    console.log('App State >>> ', this.state);
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          {
            this.state.cats.length > 0 &&
            <>
              <Cats
                cats={this.state.cats}
                deleteCats={this.deleteCats}
              />
            </>
          }
          <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
