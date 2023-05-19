import DataService from '../services/dataServices';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react'

export default function Modalpop(props) {

    const dataService = new DataService()
    const [bill, setBill] = useState({});

    var item = {}

    switch (props.route) {
        case "client" :
            item = props.data.filter(x=>x.IDCliente===props.currentItem)[0];
            break;
        case "bill" :
            item = props.data.filter(x=>x.IDFactura===props.currentItem)[0];   
            break;
        case "product" :
            item = props.data.filter(x=>x.IDProducto===props.currentItem)[0];
            break;
    }

    const edit = async () => {
        let str
        if (props.route === "client")
            str = "Desea actualizar el cliente?"
        if (props.route === "bill"){
            str = "Desea actualizar la factura?"            
            item = bill
            console.log(bill)
        }
        if (window.confirm(str) == true)
        {
            await dataService.update(props.route,item) 
        }
        props.whenClose()
        setBill({})
        item={}     
    }  

    const closeModal = () =>{
        props.whenClose()
    }

    if (props.open && props.route === "bill"){
        console.clear()
        bill.IDFactura = item.IDFactura
        bill.Fecha = item.Fecha
        bill.IDCliente = props.clients.filter(x=>x.Nombre===item.Nombre && x.Apellidos===item.Apellidos)[0].IDCliente
        console.log(bill,item)
    }

    return(
    <Modal open={props.open} disableAutoFocus >
        <div className='popupcontent' id="popup">
            { item !== undefined ? <div>
            { props.route==='client' ?
            <div className='inputs'>
                <span>Cliente</span>
                <div>
                    <span>Nombre</span>
                    <input type='text' defaultValue={item.Nombre} onChange={e => item.Nombre = e.target.value}/>
                </div>
                <div>
                    <span>Apellidos</span>
                    <input type='text' defaultValue={item.Apellidos} onChange={e => item.Apellidos = e.target.value}/>
                </div>
                <div>
                    <span>Fecha Nacimiento</span>
                    <input type='date' defaultValue={item.FechaNacimiento} onChange={e => item.FechaNacimiento = e.target.value}/>
                </div>
            </div>
            : <div></div>
            }
            { props.route==='bill' ? 
            <div className='inputs'>
                <span>Factura</span>
                <div>
                    <span>Cliente</span> 
                    <select defaultValue={bill.IDCliente} onChange={e => {bill.IDCliente = e.target.value; console.log(bill)}}>
                    {props.clients.map((item, index) => ( 
                        <option key={index} value={item.IDCliente}>{item.Nombre} {item.Apellidos}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <span>Fecha Compra</span>
                    <input type='date' defaultValue={item.Fecha} onChange={e => {bill.Fecha = e.target.value; console.log(bill)}}/>
                </div>
            </div>
            : <div></div>
            }
            { props.route==='product' ? 
            <div>
                <span>Producto</span>
            </div>
            : <div></div>
            } </div> : <div></div> }
            <div id="buttons">
                <button onClick={edit}>
                    Confirmar Cambios
                </button>
                <button onClick={closeModal}>
                    Cancelar
                </button>
            </div>
        </div>
    </Modal>
    )
}