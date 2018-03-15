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
            <div>
              <progress value={this.state.fotovalue} max="100"/>
              <br/>
              <input type="file" onChange={this.props.onUpload}/>
            </div>
        )
    }
}

export default SubirFotos;


