import React, {Component} from 'react';
import firebase from 'firebase';
import './../App.css'

class Chatroom extends  Component{
    constructor(){
        super();
        this.state = {
            mensaje: '',//almacena el valor del input
          mensajes: [],
          //donde almacenaremos las fotos que subamos
        }
        this.submit = this.submit.bind(this);
        this.smsData = this.smsData.bind(this);
        
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
   

   render(){
    const {mensajes} = this.state;
    const messageList = mensajes.map(mensaje => {
        return <li key={mensaje.id}>{mensaje.text}</li>
    })
       return(
           <div>
            <ul className="cabina left">
            {messageList}
           </ul>
           
           <form action="" className="form" onSubmit={this.submit}>
            <input type="text" width="200px" className="inputMessa" onChange={this.smsData} value={this.state.mensaje}/>
            <button className="btn">Send</button>
           </form>
           </div>
           
           
       )
   }
}
export default Chatroom;