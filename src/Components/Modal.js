import Popup from 'reactjs-popup';
import DataService from '../services/dataServices';
import React, { useState, useEffect } from 'react'


export default function Modal(props) {

    const dataService = new DataService()
    const [open, setOpen] = useState(false);

    var item
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
        if (window.confirm("Desea actualizar el cliente?"))
        {
            item.Nombre = document.getElementById("clinombre").value
            item.Apellidos = document.getElementById("cliapellidos").value
            item.FechaNacimiento = document.getElementById("clifecha").value
            await dataService.update(props.route,item) 
        }
        setOpen(true)
        props.whenClose()
    }

    return(
    <Popup open={open} trigger={props.trigger} modal nested >
        { !open ? (
        <div className='popupcontent' id="popup">
            { item !== undefined ? <div>
            { props.route==='client' ?
            <div className='inputs'>
                <span>Cliente</span>
                <div>
                    <span>Nombre</span>
                    <input type='text' id="clinombre" defaultValue={item.Nombre}/>
                </div>
                <div>
                    <span>Apellidos</span>
                    <input type='text' id="cliapellidos" defaultValue={item.Apellidos}/>
                </div>
                <div>
                    <span>Fecha Nacimiento</span>
                    <input type='date' id="clifecha" defaultValue={item.FechaNacimiento}/>
                </div>
            </div>
            : <div></div>
            }
            { props.route==='bill' ? 
            <div>
                <span>Cliente</span>
            </div>
            : <div></div>
            }
            { props.route==='product' ? 
            <div>
                <span>Producto</span>
            </div>
            : <div></div>
            } </div> : <div></div> }
            <div>
                <button onClick={edit}>
                    Confirmar Cambios
                </button>
            </div>
        </div>
        ):<div></div>}
    </Popup>
    )
}