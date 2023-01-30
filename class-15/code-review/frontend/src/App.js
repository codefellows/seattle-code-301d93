import React from 'react';
import './App.css';
import axios from 'axios';
import Bestbooks from './Bestbooks';
import Header from './Header';
import About from './About';
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
import Bookformmodal from './Bookformmodal';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      // title: '',
      // description: '',
      // status: ''

    }
  }
  // GET/ RESPONSIBLE FOR GETTING BOOKS FROM SERVER 

  getBooks = async () => {
    try {
      // TODO: use axios to call out to my server get all the booksfrom the DB
      let url = `${process.env.REACT_APP_SERVER}/books`

      let bookData = await axios.get(url);

      this.setState({
        books: bookData.data
      });

    } catch (error) {
      console.log(error.response)
    }
  }
  // **** Handle Delete Request *********
  deleteBooks = async (id) => {
    let url = `${process.env.REACT_APP_SERVER}/books/${id}`

    await axios.delete(url);
    let filterBooks = this.state.books.filter(book => book._id !== id)
    this.setState({
      books: filterBooks
    })
    
  }
 
  postBook = async (bookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;
      let createdBooks = await axios.post(url, bookObj);
      this.setState({
        books: [...this.state.books, createdBooks.data]
      })
    } catch (error){
      console.log(error.message);
    }
  }

  updateBooks = async (bookToUpdate) => {
    try {
      // TODO: URL SET FOR AXIOS
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`

      let updatedBook = await axios.put(url, bookToUpdate);
      // TODO: UPDATE STATE WITH THAT RETURN FROM AXIOS

      let updatedBookArray = this.state.books.map(exisitingBook => {
        return exisitingBook._id === bookToUpdate._id
          ? updatedBook.data
          : exisitingBook
      });

      this.setState({
        books: updatedBookArray
      });

    } catch (error) {
      console.log(error.message);
    }
  }
  // REACT LIFECYCLE METHOD 

  componentDidMount() {
    this.getBooks();
  }
  // HandleOpenModal that change setState  to true
  handleOpenModal = () => {
    this.setState({
      showModal: true,

    })
  }
  // Handler to close the modal
  handlecloseModal = () => {
    this.setState({
      showModal: false

    })
  }
  // Handler to grab form data and make my post request


  render() {
    console.log('App State >>> ', this.state);
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path='/'
              element={
                <>
                  <Button onClick={this.handleOpenModal}>Add a Book</Button>
                  <Bookformmodal show={this.state.showModal} closeModal={this.handlecloseModal} postBook={this.postBook} />
                  <Bestbooks books={this.state.books} deleteBooks={this.deleteBooks} />
                </>
              }

            >
            </Route>
            <Route
              exact path='/about'
              element={<About />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of ‘/about’ that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>

      </>
    );
  }
}

export default App;