import { Component } from 'react';
const url = require('../env/env')

class DataService extends Component {

  constructor(props) {
    super(props);
  }
  
  getAll(ruta) {
    return fetch(url + ruta + '/getall')       
  }

  getById(id) {
    return fetch(url + 'client/getbyid/' + id)
  }

  newClient(Cliente) {
    return fetch(url + 'client', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Cliente)
      })
  }

  updateClient(Cliente) {
    return fetch(url + 'client', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Cliente)
      })
  }


  deleteClient(Cliente) {
    return fetch(url + 'client', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Cliente)
      })
  }

  setRoute(ruta) {
    this.ruta = ruta;
  }

}

export default DataService;