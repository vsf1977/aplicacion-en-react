import { Component } from 'react';
const url = require('../env/env')

class DataService extends Component {

  constructor(props) {
    super(props);
  }
  
  getAll(ruta) {
    return fetch(url + ruta + '/getall')       
  }

  delete(route,id) {
    return fetch(url + route, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({"id" : id })
      })
  }

}

export default DataService;