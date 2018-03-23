import React, {Component} from 'react';
import firebase from 'firebase';
import SubirFotos from './SubirFotos';
import ChatRoom from './ChatRoom';
import Tomarfoto from './Tomarfoto';


class AccesoGoogle extends Component {
    constructor(){
        super();
         this.state  = {
           user: null,
           pictures: [],
        }
        this.inicio = this.inicio.bind(this);
        this.logOut = this.logOut.bind(this);
        this.loadPhoto = this.loadPhoto.bind(this);
    }

    componentWillMount(){//se dispara cuando el componente fue renderizado
      firebase.auth().onAuthStateChanged(user =>{
          this.setState({ user })
      });
      firebase.database().ref('pictures').on('child_added', snapshot => {
          this.setState({ 
              pictures: this.state.pictures.concat(snapshot.val())
          })
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

    loadPhoto(event){
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`/photo/${file.name}`);
        const tarea = storageRef.put(file)
 
        tarea.on('state_changed', snapshot => {
            let porcentajeProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState({
                fotosvalue: porcentajeProgress
            })
         }, error => {
             console.log(error.message);
         }, () => {
             const record = {
                 photoURL: this.state.user.photoURL,
                 displayName: this.state.user.displayName,
                 image: tarea.snapshot.downloadURL
             }
             const dbref = firebase.database().ref('pictures');
             const newPicture = dbref.push();
             newPicture.set(record);
        })
     }  

        renderLoginButton(){
            if (this.state.user) {
                return (
                   <div className="container-fluid">
                   <div className="nav-cerrar">
                      <img className="imgUserConnect" width="50px" height="50px" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                      <p className="nombreUser">{this.state.user.displayName}</p>
                       <button className="btn botonCerrar" waves='light' onClick={this.logOut}>Cerrar Sesion </button>
                       </div>
                       <ChatRoom />
                       <div className="fotos">
                       { this.state.pictures.map(picture => (
                               <div>
                                 <img  src={picture.image} className="responsive-img" width="600px" height="300px" alt=""/>
                                 <br/>
                                 <img src={picture.photoURL} className="responsive-img" width="100px" height="100px" alt={picture.displayName}/>
                                 <br/>
                                 <p>{picture.displayName}</p>
                               </div>
                           ))} 
                           </div>
                           <SubirFotos className="btn" onUpload={ this.loadPhoto  } />    
                           <Tomarfoto/>              
                    </div>
            
                )
            }else{
                return(
                <button className="btn inicia" onClick={this.inicio}>inicia Sesion con google</button>
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