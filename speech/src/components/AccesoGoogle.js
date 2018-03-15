import React, {Component} from 'react';
import firebase from 'firebase';
import SubirFotos from './SubirFotos';


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
                   <div>
                      <img width="200px" height="200px" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                      <p>{this.state.user.displayName}</p>
                       <button waves='light' onClick={this.logOut}>Cerrar Sesion </button>
                       <SubirFotos onUpload={ this.loadPhoto  } /> 
                       { this.state.pictures.map(picture => (
                               <div>
                                 <img src={picture.image} alt=""/>
                                 <br/>
                                 <img src={picture.photoURL} alt={picture.displayName}/>
                                 <br/>
                                 <span>{picture.displayName}</span>
                               </div>
                           ))} 
                           
                                         
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
            {this.renderLoginButton()}
          </div>
        );
      }
}

export default AccesoGoogle;