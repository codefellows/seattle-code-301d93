// 1st import 
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';



// 2nd Class component - Sub class that will extend the parent class from the React Library
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      heart: '',
      showModal: false,
      selectedPerson: ''
      // selectedBeast: 
    }
  }

  addHearts = () => {
    this.setState({
      heart: this.state.heart + '💖'
    });
  }

  handleOpenModal = (name) => {
    this.setState({
      showModal: true,
      selectedPerson: name
    });
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

  render(){
    return (
      <>
        <Header heart={this.state.heart}/>
        <Main 
          addHearts={this.addHearts}
          handleOpenModal={this.handleOpenModal}
        />
        {/* <SelectedBeast /> */}
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>{this.state.selectedPerson}</Modal.Header>
        </Modal>
        <Footer />
      </>
    )
  }
}


// 3rd Export the component so other files can import them
export default App;