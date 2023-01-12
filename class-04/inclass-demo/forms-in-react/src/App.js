import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';

let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedData: data,
    }
  }

  handleSelect = (event) => {
    let selected = event.target.value;

    if(selected === 'even'){
      let newData = data.filter(num => num % 2 === 0);
      this.setState({
        sortedData: newData
      });
    } else if(selected === 'odd'){
      let newData = data.filter(num => num % 2 === 1);
      this.setState({
        sortedData: newData
      });
    } else if(selected === 'all'){
      this.setState({
        sortedData: data
      })
    }

  }

  render() {
    return (
      <>
        <h1>Forms in React</h1>
        <main>
          <ListGroup>
            {this.state.sortedData.map((num, idx) => {
              return <ListGroup.Item key={idx}>{num}</ListGroup.Item>
            })}
          </ListGroup>

          <Form>
            <Form.Group>
              <Form.Select name="selected" onChange={this.handleSelect}>
                <option>Open this select menu</option>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </main>
      </>
    )
  }
}

export default App;

/* 

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      username: event.target.username.value
    })

    console.log('from state in my handleSubmit', this.state.username);
  }

  handleInput = (event) => {
    this.setState({
      username: event.target.value
    })
  }

 <p>{this.state.username}</p>
          <form onSubmit={this.handleSubmit}>
            <fieldset className="fieldset">
              <legend>User Info</legend>
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" onInput={this.handleInput}/>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
*/