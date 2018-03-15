import React, {Component} from 'react';
// import firebase from 'firebase';
class SubirFotos extends Component {
    constructor(){
        super();
        this.state = {
            fotosvalue: 0,
            picture: null,
        }
    }

    render(){
        return (
            <div>
              <progress value={this.state.fotovalue} max="100"/>
              <br/>
              <input type="file" onChange={this.props.loadPhoto}/>
              <br/>
              <img width="320" src={this.state.picture} alt=""/>
            </div>
        )
    }
}

export default SubirFotos;


