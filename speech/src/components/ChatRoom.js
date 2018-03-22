import React, {Component} from 'react';
import firebase from 'firebase';

class Chatroom extends  Component{
    constructor(){
        super();
        this.state = {
            mensaje: '',//almacena el valor del input
          mensajes: []
        }
        this.submit = this.submit.bind(this);
        this.smsData = this.smsData.bind(this);
      }
}