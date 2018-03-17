// no me salio :c

// import React, { Component } from 'react';
// import firebase from 'firebase';

// class ChatRoom extends Component {
//    constructor(){
//        super();
//        this.state = {//mis estados 
//            message: '',
//            messages: [
              
//            ]
//        }
//        this.enviaMensaje = this.enviaMensaje.bind(this)//para que no salga el error de state o setstate no esta definido
//        this.submit = this.submit.bind(this);//lo hago con las funciones
//    }

//    componentDidMount(){
//        firebase.database().ref('messages/').on('value', snap => { // creando una carpeta dentro de firebas eque no salio
//            const mensajes = snap.val();
//          if(mensajes !== null){
//              this.setState({
//                  messages: mensajes
//              })
//          }
//         })

//    }
// // apenas carge la pagina traera los mensajes
//    enviaMensaje(i){
//        this.setState({message: i.target.value})//la funciones caundo escribo
//        console.log(this.state.message)
//    }
//    submit(e){
//  e.preventDefault();
//  const list = this.state.messages;
//  const newMensaje = { // almeceno los estados 
//      id:this.state.messages.length,
//      text: this.state.message,
//  } 
// //  list.push(newMensaje);
// //  this.setState({messages: list})
// firebase.database().ref(`messages/${newMensaje.id}`)//le digo que cada ves que se actualizr guarde los mensajes
// .set(newMensaje);
//  this.setState({message: ''})
//    }

   
//     render(){
//         const {messages} = this.state;//map para recorrer 
//         const messagesP = messages.map(message => {
//             return <p key={message.id}>{message.text}</p>
//         })

//        return(
//            <div className="classRoom"> 
//               <div>
//               {messagesP}
//               </div>
//               <form onSubmit={this.submit} >
//               <input  value={this.state.message} type="text" onChange={this.enviaMensaje}/>
//               <button className="btn">
//                  send
//               </button>
//               </form>
              
              
                
             
//            </div>
//        )
//     }
// }
// export default ChatRoom;