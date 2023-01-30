import DataService from '../services/dataServices';
import apiRouteService from '../services/apiRouteService';
import React, { useState, useEffect } from 'react'

export default function Tarjeta() {

  const [clientes, initTarjeta] = useState([]);
  const [mensaje, setMensaje] = useState();
  const dataService = new DataService()
  const fetchData = async (route) => {
    const response = await dataService.getAll(route)      
    if (!response.ok) {
      throw new Error('Data could not be fetched!')
    } else {
      return response.json()
    }
  }

  useEffect(() => {    
    apiRouteService.getRoute().subscribe(message => {
      if (message) {
        setMensaje(message)
        fetchData(message)
          .then((res) => {
            initTarjeta(res)
            console.log(res)
          })
          .catch((e) => {
            console.log(e.message)
          })
      } else {
        throw new Error('Route could not be fetched!')
      }
    });
  }, [])

  return (
    <div className="row container">
      {clientes.map((item, idx) => {
        return (
          <div className="col-lg-2 col-md-3 col-sm-6 mb-3 tarjetas" key={idx}>
            <div className="card h-100">
              <ul className="list-group list-group-flush">
                { mensaje==='client' ? <div>
                <li className="list-group-item">
                  <strong>Nombre:</strong> {item.Nombre}
                </li>
                <li className="list-group-item">
                  <strong>Capital:</strong> {item.Apellidos}
                </li>
                <li className="list-group-item">
                  <strong>Fecha Nacimiento:</strong> {item.FechaNacimiento}
                </li> </div> : <div></div>
                }
                { mensaje==='bill' ? <div>                
                <li className="list-group-item">
                  <strong>Capital:</strong> {item.IDFactura}
                </li>
                <li className="list-group-item">
                  <strong>Fecha Nacimiento:</strong> {item.Fecha}
                </li> </div> : <div></div>
                }
                <button>Editar</button>
                <button>Eliminar</button>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}