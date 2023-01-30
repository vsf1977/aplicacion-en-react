import React, { Component } from 'react';
import DataService from '../services/dataServices';
import apiRouteService from '../services/apiRouteService';

export default class Navbar extends Component {

  dataService = new DataService()

  routing = (e) => {
    const menu = document.getElementById("menu").childNodes; 
    const ruta = e.target.id;
    apiRouteService.sendRoute(ruta)
    menu.forEach(item => {
      item.classList.remove("actual")
      item.classList.add("normal")
      if (item.firstChild.id == ruta)        
      {
        item.classList.add('actual')
        item.classList.remove("normal")
      }      
    });
  }

  render() {
    return (
      <div className="nav_bar">
        <ul id="menu">
          <li><a id='client' onClick={(event)=>this.routing(event)}>Clientes</a></li>
          <li><a id='bill' onClick={(event)=>this.routing(event)}>Facturas</a></li>
        </ul>
      </div>
    );
  }
}

  /*
  const Cliente = {
    IDCliente: 5,
    Nombre: 'Sarah',
    Apellidos: 'Nurse',
    FechaNacimiento: new Date('1988/06/06')
  }

    const fetchData = async () => {
      const response = await dataService.newClient(Cliente)      
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }

    fetchData()
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e.message)
        })
  */