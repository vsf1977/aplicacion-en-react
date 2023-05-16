import './styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './Components/Navbar';
import Tarjeta from './Components/Tarjeta';
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<>
        <NavBar/>
        <Tarjeta/>
    </>
);