import React from 'react';
import './App.css';
import axios from 'axios';


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

  // REACT LIFECYCLE METHOD 

  componentDidMount(){
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
              {this.state.cats.map(cat => {
                return <p key={cat._id}>{cat.name} is a {cat.color} cat</p>
              })}
            </>
          }
        </main>
      </>
    );
  }
}

export default App;