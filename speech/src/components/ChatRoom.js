import React, {Component} from 'react';
import firebase from 'firebase';
import SubirFotos from './SubirFotos';
import './../App.css';

class Chatroom extends  Component{
    constructor(){
        super();
        this.state = {
            mensaje: '',//almacena el valor del input
          mensajes: [],
          pictures: [], //donde almacenaremos las fotos que subamos
        }
        this.submit = this.submit.bind(this);
        this.smsData = this.smsData.bind(this);
        this.loadPhoto = this.loadPhoto.bind(this)
      }

      componentDidMount(){
          firebase.database().ref('mensajes/').on('value', snap => {
              const currentMessages = snap.val();
              if (currentMessages !== null) {
                  this.setState({
                      mensajes: currentMessages
                  })
              }

          })
          firebase.database().ref('pictures').on('child_added', snapshot => { //creo una carpeta pictures en firebase
            this.setState({ 
                pictures: this.state.pictures.concat(snapshot.val())
                //creo una un array nuevo , sin afectar el primero con concat
            })
        })
      }

   submit(e){
       e.preventDefault();
    //    console.log('diste enter')
    const list = this.state.mensajes;
    const newMessage = {
        id: this.state.mensajes.length,
        text: this.state.mensaje
    }
    // list.push(newMessage);
    // this.setState({mensajes: list});
     firebase.database().ref(`mensajes/${newMessage.id}`)
       .set(newMessage);
    this.setState({mensaje: ''});
   }
   smsData(e){
    //    console.log(e.target.value)
    this.setState({mensaje: e.target.value});
    console.log(this.state.mensaje)
   }  
   loadPhoto(event){
    const file = event.target.files[0]; // para subir una foto  y queda guarda en la base de datos y en pagina
    const storageRef = firebase.storage().ref(`/photo/${file.name}`);
    const tarea = storageRef.put(file);
    return tarea;

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
         const dbref = firebase.database().ref('pictures'); // la foto que subas, la url que tiene se guardara en firebase
         const newPicture = dbref.push();
         newPicture.set(record);
    })
 }   

   render(){
    const {mensajes} = this.state;
    const messageList = mensajes.map(mensaje => {
        return <li key={mensaje.id}>{mensaje.text}</li>
    })
       return(
           <div className="room">
            <ul className="cabina">
            {messageList}
            { this.state.pictures.map(picture => (
                <div>
                <img with="250px" height="250px" src={picture.image} alt=""/>
                                <br/>
                                 <img with="100px" height="100px" src={picture.photoURL} alt={picture.displayName}/>
                                 <br/>
                                 <p>{picture.displayName}</p>
                                 </div>  
                           ))}

           </ul>
           <form action="" onSubmit={this.submit}>
            <input type="text" onChange={this.smsData} value={this.state.mensaje}/>
            <button>Send</button>
            <SubirFotos onUpload={ this.loadPhoto  } />
           </form>
           </div>
           
           
       )
   }
}
export default Chatroom;