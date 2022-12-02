import './styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import Tarjeta from './components/Tarjeta';
import ClientService from './services/clientServices';
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
const clientService = new ClientService()

const Cliente = {
    IDCliente: 19,
    Nombre: 'Gisela',
    Apellidos: 'Peña',
    FechaNacimiento: new Date('1975/09/15')
}
console.log(clientService.newClient(Cliente))

root.render(<>
        <NavBar/>
        <Tarjeta/>
    </>
);