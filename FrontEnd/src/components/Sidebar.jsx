import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from "react-router-dom";

export default function Sidebar() {
    const [permiso, setPermiso] = useState(null);

    useEffect(() => {
        const storedPermiso = sessionStorage.getItem('permiso');
        setPermiso(storedPermiso);
    }, []); 

    return (
        <Navbar className="bg-light" style={{ height: 'auto', alignItems: 'start', minHeight: '100vh' }}>
            <Nav defaultActiveKey="/" className="flex-column sidebar-sticky">
                <Link to="/home"><Nav.Link href="/home">Inicio</Nav.Link></Link>
                
                <Link to="/simulacion"><Nav.Link href="/simulacion">Simulacion</Nav.Link></Link>
                <Link to="/prestamos"><Nav.Link href="/prestamos">Crear formulario préstamo</Nav.Link></Link>
                {permiso === "true" ? (
                    <React.Fragment>
                        <Link to="/users"><Nav.Link href="/users">Usuarios</Nav.Link></Link>
                        <Link to="/Generador"><Nav.Link href="/Generador">Generar informe</Nav.Link></Link>
                        <Link to="/GeneradorDocAn"><Nav.Link href="/GeneradorDocAn">Generar informe analista</Nav.Link></Link>
                        <Link to="/Mostrarprestamosdet"><Nav.Link href="/Mostrarprestamosdet">Generar informe analista</Nav.Link></Link>
                        <Link to="/sims"><Nav.Link href="/sims">Mostrar simulaciones</Nav.Link></Link>
                        <Link to="/Mostrarprestamos"><Nav.Link href="/Mostrarprestamos">Mostrar formulario préstamo</Nav.Link></Link>
                    </React.Fragment>
                ) : null}
            </Nav>
        </Navbar>
    );
}