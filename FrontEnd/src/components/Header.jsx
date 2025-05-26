import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { useSelector } from 'react-redux'
import LaClaveImage  from '../images/LaClave.png'
import Logout from '../views/users/Logout'

export default function Header() {
    const nombre = useSelector((store => store.username));
    const isAuthenticated = JSON.parse(sessionStorage.getItem('authToken'))
    return (
       <Navbar style={{backgroundColor: "#87ceeb"}} className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="/home">
                
            <div>  <img src={LaClaveImage} alt="La Clave"/> </div>

            </Navbar.Brand>
            <div className="text-white"> </div>
            {isAuthenticated ? (<Logout />): (<></>)}
        </Navbar>
    )
}

