import React, {Component} from 'react';



class SubirFotos extends Component {
    constructor(){
        super();
        this.state = {
            fotosvalue: 0,
        }   
    } 
    // el onChange se conecta con el onupload para hacer la subida
    // ya que esta en otro componente , lo llamo atraves de this.props
    
    render(){
        return (
            <div className="subirfoto">
              <progress value={this.state.fotosvalue} max="100"/>
              <br/>
              <input type="file" className="btn" onChange={this.props.onUpload}/>
            </div>
        )
    }
}

export default SubirFotos;


