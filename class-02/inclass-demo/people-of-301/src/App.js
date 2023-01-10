// 1st import 
import React from 'react';
import Header from './Header';
import Main from './Main'
import Footer from './Footer'



// 2nd Class component - Sub class that will extend the parent class from the React Library
class App extends React.Component{
  render(){
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    )
  }
}


// 3rd Export the component so other files can import them
export default App;