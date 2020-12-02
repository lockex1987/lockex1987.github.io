import React from 'react';

class App1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div className='container'>
        <h2>App #1</h2>

        <p>You clicked {this.state.count} times</p>

        <button onClick={() => this.setCount(this.state.count + 1)}>
          Click me
        </button>
      </div>
    );
  }

  setCount(n) {
    this.setState({
      count: n
    });
  }
}

export default App1;
