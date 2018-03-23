import React, { Component } from 'react';

import Webcam from 'react-webcam';
import ContEspejo from './ContEspejo';
// la dependencia de react webcam
class Camara extends Component {
    constructor(props) {
      super(props);
      this.newMethod();// hice un funcion afuera para llamarla adentro
    }
    handleClick = () => {
      const screenshot = this.webcam.getScreenshot();
      this.setState({ screenshot }); // al hacer click se mostrara al costado de canvas
    }
    newMethod() {
        this.state = {
            screenshot: [],
            tab: 0
        };
    }

    // {this.state.screenshot ? <img src={this.state.screenshot} /> :null } 
    // se pondra la foto que tomas encima de la anterior tomada
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


