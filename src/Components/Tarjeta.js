import DataService from '../services/dataServices';
import apiRouteService from '../services/apiRouteService';
import React, { useState, useEffect } from 'react'
import Modalpop from './Modalpop';

export default function Tarjeta() {

  const [data, initTarjeta] = useState([]);
  const [route, setRoute] = useState();
  const [itemID, setitemID] = useState();
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);

  const getClients = async () =>{
    const response = await dataService.getAll("client")      
    if (!response.ok) {
        throw new Error('Data could not be fetched!')
    } else {
        return response.json()
    }  
  }  

  const handleOpen = (p) => {
    getClients().then((res) => {
      setClients(res)
      setitemID(p.target.id)
      setOpen(true);
    })
  }
  const handleClose = () => setOpen(false);
  const dataService = new DataService()
  const fetchData = async (route) => {
    const response = await dataService.getAll(route)      
    if (!response.ok) {
      throw new Error('Data could not be fetched!')
    } else {
      return response.json()
    }
  }

  const refresh = () => {
    fetchData(route)
      .then((res) => {    
        initTarjeta(res)
      })
      .catch((e) => {
      })
    handleClose()
  }  

  const erase = async (p) => {
    let str = route === "client" ? "este cliente?" : route === "bill" ? "esta factura?" : "este producto?"
    if (window.confirm("Desea borrar " + str ))
    {
      console.log(data)
      let del = true;
      if (route==="client")
        if (data.filter(x=>x.IDCliente===p.target.id)[0].Factura.length > 0)
        {
          alert("Este cliente aun tiene facturas, debe eliminarlas primero")
          del = false;
        }
      if (route==="product") 
        if (data.filter(x=>x.IDProducto===p.target.id)[0].Factura.length > 0)
        {
          alert("Hay facturas con este producto, debe eliminarlas primero")
          del = false;
        }
      if (del){
        await dataService.delete(route,p.target.id)   
        console.log("se borra") 
        fetchData(route)
          .then((res) => {            
            initTarjeta(res)
          })
          .catch((e) => {
          })
      }
    }
  }

  useEffect(() => {    
    apiRouteService.getRoute().subscribe(message => {
      if (message) {
        setRoute(message)
        fetchData(message)
          .then((res) => {            
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
                { route==='client' ? <div>
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
                  <strong>No de Facturas:</strong> {item.Factura !== undefined ? item.Factura.length :0}
                </li> </div> : <div></div>
                }
                { route==='bill' ? <div>                
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
                  <strong>Cantidad de productos:</strong> {item.Cantidad}
                </li> </div> : <div></div>
                }          
                { route==='product' ? <div>                
                <li className="list-group-item">
                  <strong>Nombre:</strong> {item.Nombre}
                </li>
                <li className="list-group-item">
                  <strong>Precio:</strong> {item.Precio}
                </li> </div> : <div></div>
                }   
                <button id= {item.IDFactura !== undefined ? item.IDFactura : item.IDCliente !== undefined ? item.IDCliente : item.IDProducto} onClick={handleOpen}>Editar</button>
                <Modalpop 
                    open={open}
                    data={data}  
                    clients={clients}
                    route={route} 
                    currentItem={itemID} 
                    whenClose={refresh}>
                </Modalpop>
                <button id= {item.IDFactura !== undefined ? item.IDFactura : item.IDCliente !== undefined ? item.IDCliente : item.IDProducto} onClick={erase}>Eliminar</button>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}