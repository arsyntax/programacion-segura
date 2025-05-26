import React, {Fragment, useState, useEffect}  from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './users/login';
import GenerarDoc from './Latex/Generardocumentos';
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Button from 'react-bootstrap/Button';
import Sidebar from '../components/Sidebar';
import grafico from '../images/grafico.jpg';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(async () => {
        const checkAuthentication = async () => {
            try {
                
                    const authToken = JSON.parse(sessionStorage.getItem('authToken'));
                    setIsAuthenticated(!!authToken); // Convert to boolean
                    
            } catch (error) {
              console.error('Error checking authentication:', error);
            }
          };
      checkAuthentication();
    }, []); // Empty dependency array means this effect runs once after initial render

    return (
            <div>
                <>
                    {isAuthenticated ? (
                        // User is logged in, display other content
                        <div>
                            <Row className="no-gutters">
                                <Col xs="10">
                                    <p>Bienvenido.</p>
                                        <Card style={{ width: '80%' }}>
                                        <Card.Img variant="top" src={grafico} />
                                        </Card>
                                </Col>
                            </Row>
                        </div>
                        ) : (
                        // User is not logged in, show the Login component
                        <Login />
                        )
                    }
                </>
            </div>
        )
}