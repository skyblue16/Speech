import React, {Component} from 'react';
import firebase from 'firebase';


class AccesoGoogle extends Component {
    // constructor(){
    //     super();
    //     const usuario = this.state  = {
    //        user: null,
    //     }
    // }

    componentDidMount(){
    }
    inicio(){
       const provider = new firebase.auth.GoogleAuthProvider();

       firebase.auth().signInWithPopup(provider)
         .then(results => console.log(`${results.user.email} ha iniciado sesion`))
        .catch(error => console.log(`error ${error.code}: ${error.message}`));    
        }

    render() {
        return (
        <div className="App">
           <button onClick={this.inicio}>inicia Sesion con google</button>
          </div>
        );
      }
}

export default AccesoGoogle;