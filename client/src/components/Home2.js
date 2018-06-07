import React, { Component } from 'react';

import {
  Link,
} from 'react-router-dom';

class Home2 extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div><Link to="/">back</Link></div>
    );
  }
}

export default Home2;