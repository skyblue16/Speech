import React, {Component} from 'react';
import firebase from 'firebase';
import Camara from './Tomarfoto';
import ChatRoom from './ChatRoom';
import './../App.css'


class AccesoGoogle extends Component {
    constructor(){
        super();
         this.state  = {
           user: null,
           
        }
        this.inicio = this.inicio.bind(this);
        this.logOut = this.logOut.bind(this);//cuando esta fuera del alcanze global 
       
    }

    componentWillMount(){//se dispara cuando el componente fue renderizado
      firebase.auth().onAuthStateChanged(user =>{
          this.setState({ user })//auth el metodo para 
      });
    }
    inicio(){
        const provider = new firebase.auth.GoogleAuthProvider();
 
        firebase.auth().signInWithPopup(provider)
          .then(results => console.log(`${results.user.email} ha iniciado sesion`))
         .catch(error => console.log(`error ${error.code}: ${error.message}`));    
         } //iniciar sesion con la api de google
    
    logOut(){
        firebase.auth().signOut()
         .then(results => console.log(`${results.user.email} ha icerrado sesion`))
        .catch(error => console.log(`error ${error.code}: ${error.message}`)); 
    } // cerrar sesion 


    


        renderLoginButton(){
            if (this.state.user) {
                return (
                   <div>
                   <div className="nav-cerrar"> 
                      <img className="img" width="100px" height="100px" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                      <p className="nombre">{this.state.user.displayName}</p>
                       <button className="btn" waves='light' onClick={this.logOut}>Cerrar Sesion </button>
                       </div>
                       <Camara />
                       <ChatRoom />                   
                    </div>
            
                )
            }else{
                return(
                <button class="btn" className="inicia btn" onClick={this.inicio}>inicia Sesion con google</button>
                )
            }
   
        }
    
    render() {
        return (
        <div className="App">
            {this.renderLoginButton()}
          </div>
        );
      }
}

export default AccesoGoogle;