import React, {Component} from 'react';



class SubirFotos extends Component {
    constructor(){
        super();
        this.state = {
            fotosvalue: 0,
        }   
    }
    
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


