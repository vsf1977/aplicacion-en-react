import './styles/styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import Tarjeta from './components/Tarjeta';
import "bootstrap/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<>
        <NavBar/>
        <Tarjeta/>
    </>
);