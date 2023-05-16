import DataService from '../services/dataServices';
import apiRouteService from '../services/apiRouteService';
import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup';

export default function Tarjeta() {

  const [data, initTarjeta] = useState([]);
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

  const erase = async (p) => {
    console.log(p.target.id, mensaje)
    const response = await dataService.delete(mensaje,p.target.id)    
    fetchData(mensaje)
      .then((res) => {            
        initTarjeta(res)
      })
      .catch((e) => {
      })
  }

  const edit = (p) => {
    console.log(p.target.id)
  }


  useEffect(() => {    
    apiRouteService.getRoute().subscribe(message => {
      if (message) {
        setMensaje(message)
        fetchData(message)
          .then((res) => {            
            console.log(res)
            initTarjeta(res)
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
      {data.map((item, idx) => {
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
                </li>
                <li className="list-group-item">
                  <strong>No de Facturas:</strong> {item.Factura != undefined ? item.Factura.length :0}
                </li> </div> : <div></div>
                }
                { mensaje==='bill' ? <div>                
                <li className="list-group-item">
                  <strong>Nombre Cliente:</strong> {item.Nombre + ' ' + item.Apellidos}
                </li>
                <li className="list-group-item">
                  <strong>Fecha:</strong> {item.Fecha}
                </li>
                <li className="list-group-item">
                  <strong>Valor Total:</strong> {item.Total}
                </li>
                <li className="list-group-item">
                  <strong>Cantidad:</strong> {item.Cantidad}
                </li> </div> : <div></div>
                }              
                <Popup trigger={<button>Editar</button>}
                modal nested>
                { close => (<div className='popupcontent'>
                                <span>Welcome to GFG!!!</span>
                                <div>
                                    <button id= {item.IDFactura != undefined ? item.IDFactura : item.IDCliente} onClick={edit}>
                                        Close modal
                                    </button>
                                </div>
                            </div>)
                }
                </Popup>
                <button id= {item.IDFactura != undefined ? item.IDFactura : item.IDCliente} onClick={erase}>Eliminar</button>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}