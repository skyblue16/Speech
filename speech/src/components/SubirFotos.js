import React, {Component} from 'react';
import firebase from 'firebase';


class SubirFotos extends Component {
    constructor(){
        super();
        this.state = {
            fotosvalue: 0,
            picture: null,
        }
        this.loadPhoto = this.loadPhoto.bind(this);
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
            this.setState({
               fotosvalue: 100,
               picture: tarea.snapshot.downloadURL 
            })
       })
    }

    render(){
        return (
            <div>
              <progress value={this.state.fotovalue} max="100"/>
              <br/>
              <input type="file" onChange={this.loadPhoto}/>
              <br/>
              <img width="320" src={this.state.picture} alt=""/>
            </div>
        )
    }
}

export default SubirFotos;


