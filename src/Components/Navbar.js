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
      if (item.firstChild.id === ruta)        
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
          <li><a id='product' onClick={(event)=>this.routing(event)}>Productos</a></li>
        </ul>
        <i class="fa-solid fa-plus"></i>
      </div>
    );
  }
}