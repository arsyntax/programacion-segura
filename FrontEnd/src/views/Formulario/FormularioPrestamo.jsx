import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { CreateSims, createPrestamos } from "../../repositories/user";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


export default function Formulario() {
	const history = useNavigate ();

	const [state, setstate] = useState({});

	const submitForm = async (e) => {
		e.preventDefault();
		const selectedDate = new Date();
		const year = selectedDate.getFullYear();
		const month = selectedDate.getMonth() + 1; 
		const day = selectedDate.getDate() + 1;
		try {
			const response = await createPrestamos({
				valor: state.valor,
				razon: state.razon,
				correo: state.correo,
				nombre: state.nombre,
				numMes: state.numMes,
                rut: state.rut,
				dia : day,
                mes : month,
                año : year,
				ejecutivo: sessionStorage.getItem('ejecutivo'),
			});
			alert(JSON.stringify(response))
			return (
				<div className="container mt-4">
					<p>Este prestamo se ha guardado correctamente. </p>
				</div>
			);
		} catch (error) {
			alert("Ha ocurrido un error al actualizar");
		}
	};

	return (
		<>
		<Row className="no-gutters" style= {{
            height: 'auto', 
            alignItems:'start', 
            minHeight: '100vh',
            backgroundColor: 'aliceblue',
            }}>
		
			<div className="container mt-4"   style= {{
            height: 'auto', 
            alignItems:'start', 
            minHeight: '100vh',
            color: '',
            }}>
				<form onSubmit={submitForm}>
					<div className="form-group">
						<label htmlFor="valor" style={{fontWeight: 'bold', color: 'darkslategrey'}}>Ingrese valor del prestamo necesitado</label>
						<input
							style={{backgroundColor: 'white',}}
							className="form-control"
							id="valor"
							type="text"
							value={state.valor}
							onChange={(e) => {
								setstate({ ...state, valor: e.target.value });
							}}
							placeholder="Ingrese valor del prestamo"
							required
							
						/>
					</div>
					<div className="form-group">
						<label htmlFor="razon" style={{fontWeight: 'bold', color: 'darkslategrey'}}>Ingrese razón de prestamo</label>
						<input
							style={{backgroundColor: 'white',}}
							className="form-control"
							id="razon"
							type="text"
							value={state.razon}
							onChange={(e) => {
								setstate({ ...state, razon: e.target.value });
							}}
							placeholder="Ingrese razon de prestamo"
							required
						/>
						
					</div>
                    <div className="form-group">
						<label htmlFor="correo" style={{fontWeight: 'bold', color: 'darkslategrey'}}>Ingrese correo</label>
						<input
							style={{backgroundColor: 'white',}}
							className="form-control"
							id="correo"
							type="email"
							value={state.correo}
							onChange={(e) => {
								setstate({ ...state, correo: e.target.value });
							}}
							placeholder="Ingrese su correo"
							required
						/>
						<br></br>
						
					</div>
                    <div className="form-group">
						<label htmlFor="nombre" style={{fontWeight: 'bold', color: 'darkslategrey'}}>Ingrese el nombre completo</label>
						<input
							style={{backgroundColor: 'white',}}
							className="form-control"
							id="nombre"
							type="text"
							value={state.nombre}
							onChange={(e) => {
								setstate({ ...state, nombre: e.target.value });
							}}
							placeholder="Ingrese el nombre"
							required
						/>
						<br></br>
						
					</div>
                    <div className="form-group">
						<label htmlFor="numMes" style={{fontWeight: 'bold', color: 'darkslategrey'}}>Ingrese el numero de meses </label>
						<input
							style={{backgroundColor: 'white',}}
							className="form-control"
							id="numMes"
							type="numero"
							value={state.numMes}
							onChange={(e) => {
								setstate({ ...state, numMes: e.target.value });
							}}
							placeholder="Ingrese el numero de meses"
							required
						/>
						<br></br>
						
					</div>
                    <div className="form-group">
						<label htmlFor="rut" style={{fontWeight: 'bold', color: 'darkslategrey'}}>Ingrese su rut sin guion verificador</label>
						<input
							style={{backgroundColor: 'white',}}
							className="form-control"
							id="rut"
							type="text"
							value={state.rut}
							onChange={(e) => {
								setstate({ ...state, rut: e.target.value });
							}}
							placeholder="Ingrese rut"
							required
						/>
						<br></br>
						
					</div>
					<div className="float-right">
						<button type="submit" className="btn btn-primary">
							Guardar
						</button>
					</div>
				</form>
			</div>
		</Row>
		</>
	);
}
