import React, {Fragment} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import UsersEdit from "./views/users/edit";
import UsersView from "./views/users/show";
import UserList from "./views/users/index";
import UserAdd from "./views/users/create";
import Login from "./views/users/login";
import ShowSimulation from "./views/Simulacion/showSimulaciones";
import ShowPrestamo from "./views/Formulario/Mostrarprestamo";
import GenerarDocdet from "./views/Latex/Generarinformedevalores";

import Home from "./views/Home";
import Simulacion from "./views/Simulacion/simulacion";
import Formulario from "./views/Formulario/FormularioPrestamo";
import GenerarDoc from "./views/Latex/Generardocumentos";
import GenerarDocAn from "./views/Latex/GenInform";
import Footer from "./components/Fotter";

const PrivateRoute = () => {
    const isAuthenticated = JSON.parse(sessionStorage.getItem('authToken'));
    const permiso = sessionStorage.getItem('permiso');

    return permiso === 'true' ? <Outlet /> : <Navigate to="/home" />;
};

export default function App() {
    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: '1' }}>
                <Header />
                <Container fluid className="p-0">
                    <Row className="no-gutters">
                        {JSON.parse(sessionStorage.getItem('authToken')) ? (
                            <Col xs="2">
                                <Sidebar />
                            </Col>
                        ) : (
                            <Col xs="1"></Col>
                        )}
                        <Col xs="10">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/private" element={<PrivateRoute />}>
                                    <Route path="users/create" element={<UserAdd />} />
                                    <Route path="users/:id/edit" element={<UsersEdit />} />
                                    <Route path="users/:id" element={<UsersView />} />
                                    <Route path="users" element={<UserList />} />
                                </Route>
                                <Route path="/login" element={<Login />} />
                                <Route path="/simulacion" element={<Simulacion />} />5
                                <Route path="/Generador" element={<GenerarDoc />} />
                                <Route path="/GeneradorDocAn" element={<GenerarDocAn />} />
                                <Route path="/prestamos" element={<Formulario />} />
                                <Route path="/Mostrarprestamos" element={<ShowPrestamo />} />
                                <Route path="/Mostrarprestamosdet" element={<GenerarDocdet />} />
                                <Route path="/sims" element={<ShowSimulation />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        </Router>
    );
}

const Public = () => <div>Public</div>;
const Private = () => <div>Private</div>;
