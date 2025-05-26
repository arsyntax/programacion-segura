import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { CreateSims } from "../../repositories/user";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Sidebar from "../../components/Sidebar";

export default function Simulacion() {
	const history = useNavigate ();

	const [state, setstate] = useState({});

	const submitSim = async (e) => {
		e.preventDefault();
		const selectedDate = new Date(state.fecha);
		const year = selectedDate.getFullYear();
		const month = selectedDate.getMonth() +1; 
		const day = selectedDate.getDate();
		try {
			const response = await CreateSims({
				valorcredito: state.valor,
				plazo: state.plazo,
				taza: state.taza,
				year,
				month,
				day,
			});
			print(resoibse)
		} catch (error) {
			console.error(error);
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
		
			<div className="container mt-4" style= {{height: 'auto', alignItems:'start', minHeight: '100vh',  backgroundColor: 'aliceblue', }}>
				<form onSubmit={submitSim}>
					<div className="form-group">
						<label htmlFor="valor" style={{fontWeight: 'bold'}}>Valor prestamo en UF</label>
						<input
							className="form-control"
							id="valor"
							type="number"
							value={state.valor}
							onChange={(e) => {
								setstate({ ...state, valor: e.target.value });
							}}
							placeholder="Ingrese valor del prestamo"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="plazo" style={{fontWeight: 'bold'}}>Plazo de cuotas totales</label>
						<input
							className="form-control"
							id="plazo"
							type="number"
							value={state.plazo}
							onChange={(e) => {
								setstate({ ...state, plazo: e.target.value });
							}}
							placeholder="Ingrese plazo del interés"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="taza" style={{fontWeight: 'bold'}}>Tasa de interés</label>
						<input
							className="form-control"
							id="taza"
							type="number"
							value={state.taza}
							onChange={(e) => {
								setstate({ ...state, taza: e.target.value });
							}}
							placeholder="Ingrese tasa de interés"
							required
						/>
						<br></br>
						<label htmlFor="taza" style={{fontWeight: 'bold'}}>Fecha de prestamo:</label>
						
					</div>
					<div className="form-group">
						<input 
							type="date"
							value={state.fecha}
							onChange={(e) => {
								setstate({ ...state, fecha: e.target.value });
							}}
							placeholder="Ingrese fecha"
							/>
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
