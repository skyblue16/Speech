import React, {Component} from 'react';
import firebase from 'firebase';
import SubirFotos from './SubirFotos';
import Camara from './Tomarfoto';
import './../App.css'


class AccesoGoogle extends Component {
    constructor(){
        super();
         this.state  = {
           user: null,
           pictures: [],//donde almacenaremos las fotos que subamos
        }
        this.inicio = this.inicio.bind(this);
        this.logOut = this.logOut.bind(this);//cuando esta fuera del alcanze global 
        this.loadPhoto = this.loadPhoto.bind(this);//a las funciones
    }

    componentWillMount(){//se dispara cuando el componente fue renderizado
      firebase.auth().onAuthStateChanged(user =>{
          this.setState({ user })//auth el metodo para 
      });
      firebase.database().ref('pictures').on('child_added', snapshot => { //creo una carpeta pictures en firebase
          this.setState({ 
              pictures: this.state.pictures.concat(snapshot.val())
              //creo una un array nuevo , sin afectar el primero con concat
          })
      })
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


    loadPhoto(event){
        const tarea = this.newMethod(event);
 
        tarea.on('state_changed', snapshot => { // la barra de progresso de no me fuciono
            let porcentajeProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                fotosvalue: porcentajeProgress
            })
         }, error => {
             console.log(error.message);
         }, () => {
             const record = { // record contiene la foto del usuario, el nombre, y la foto que subas
                 photoURL: this.state.user.photoURL,
                 displayName: this.state.user.displayName,
                 image: tarea.snapshot.downloadURL
             }
             const dbref = firebase.database().ref('pictures');
             const newPicture = dbref.push();
             newPicture.set(record);
        })
     }  

    newMethod(event) {// funcion para minificar mi loadPhoto
        const file = event.target.files[0]; // para subir una foto  y queda guarda en la base de datos y en pagina
        const storageRef = firebase.storage().ref(`/photo/${file.name}`);
        const tarea = storageRef.put(file);
        return tarea;
    }

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
                       <SubirFotos onUpload={ this.loadPhoto  } />
                       <h3>fotos subidas:</h3>
                       { this.state.pictures.map(picture => (
                               <div>
                                 <img with="250px" height="250px" src={picture.image} alt=""/>
                                 <br/>
                                 <img with="100px" height="100px" src={picture.photoURL} alt={picture.displayName}/>
                                 <br/>
                                 <span>{picture.displayName}</span>
                               </div>
                           ))}
                           
                                         
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