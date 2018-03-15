import React, {Component} from 'react';
import firebase from 'firebase';
import SubirFotos from './SubirFotos';


class AccesoGoogle extends Component {
    constructor(){
        super();
         this.state  = {
           user: null,
        }
        this.inicio = this.inicio.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    componentWillMount(){//se dispara cuando el componente fue renderizado
      firebase.auth().onAuthStateChanged(user =>{
          this.setState({ user })
      })
    }
    inicio(){
       const provider = new firebase.auth.GoogleAuthProvider();

       firebase.auth().signInWithPopup(provider)
         .then(results => console.log(`${results.user.email} ha iniciado sesion`))
        .catch(error => console.log(`error ${error.code}: ${error.message}`));    
        }
    logOut(){
        firebase.auth().signOut()
         .then(results => console.log(`${results.user.email} ha icerrado sesion`))
        .catch(error => console.log(`error ${error.code}: ${error.message}`)); 
    }    

        renderLoginButton(){
            if (this.state.user) {
                return (
                    <div>
                      <img width="200px" height="200px" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                      <p>{this.state.user.displayName}</p>
                      <SubirFotos />
                       <button onClick={this.logOut}>Cerrar Sesion </button>
                     </div>
                )
            }else{
                return(
                <button onClick={this.inicio}>inicia Sesion con google</button>
                )
            }
        }
    
    render() {
        return (
        <div className="App">
           <p > {this.renderLoginButton()}</p>
          </div>
        );
      }
}

export default AccesoGoogle;