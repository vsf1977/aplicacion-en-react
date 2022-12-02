import ClientService from '../services/clientServices';
import React, { useState, useEffect } from 'react'
const url = require('../env/env')

export default function Tarjeta() {
  const [clientes, initTarjeta] = useState([])
  const clientService = new ClientService()
  const fetchData = async () => {
    const response = await clientService.getAll()      
    if (!response.ok) {
      throw new Error('Data coud not be fetched!')
    } else {
      return response.json()
    }
  }
  useEffect(() => {
    fetchData()
      .then((res) => {
        initTarjeta(res)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])
  return (
    <div className="row container">
      {clientes.map((item, idx) => {
        return (
          <div className="col-lg-2 col-md-3 col-sm-6 mb-3 tarjetas" key={idx}>
            <div className="card h-100">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Nombre:</strong> {item.Nombre}
                </li>
                <li className="list-group-item">
                  <strong>Capital:</strong> {item.Apellidos}
                </li>
                <li className="list-group-item">
                  <strong>Fecha Nacimiento:</strong> {item.FechaNacimiento}
                </li>
                <button>Editar</button>
                <button>Eliminar</button>
              </ul>
            </div>z
          </div>
        )
      })}
    </div>
  )
}