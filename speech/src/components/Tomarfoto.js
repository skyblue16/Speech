import React, { Component } from 'react';

import Webcam from 'react-webcam';

class Camara extends Component {
    constructor(props) {
      super(props);
      this.state = {
        screenshot: [],
        tab: 0
      };
    }
    handleClick = () => {
      const screenshot = this.webcam.getScreenshot();
      this.setState({ screenshot });
    }
    render() {
      return (
        <div className="ajuste">
          <Webcam
            audio={false}
            ref={node => this.webcam = node}
            className="camara"
          />
          <div>
            <h2>Espejo</h2>
            <div className='screenshots'>
              <div className='controls'>
                <button className="btn" onClick={this.handleClick}>capture</button>
              </div>
              <div className="capture">
              {this.state.screenshot ? <img src={this.state.screenshot} /> :null }
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Camara;


