import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { createUser } from "../../repositories/user";

export default function create() {
	const history = useNavigate ();

	const [state, setstate] = useState({});
	
	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const lowercaseEmail = state.email.toLowerCase();
			if (lowercaseEmail.endsWith("@ventas.com")){
				setstate({ ...state, permiso: true})
			  }
			  else{
				setstate({ ...state, permiso: false})
			  }
			const response = await createUser(state);
			history(`/home`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mt-4">
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre</label>
					<input
						className="form-control"
						id="nombre"
						type="text"
						value={state.nombre}
						onChange={(e) => {
							setstate({ ...state, nombre: e.target.value });
						}}
						placeholder="Ingrese Nombre"
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						className="form-control"
						id="email"
						type="email"
						value={state.email}
						onChange={(e) => {
							setstate({ ...state, email: e.target.value });
						}}
						placeholder="Ingrese Email"
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password: 
					<input
						type="password"
						id="password"
						value={state.password}
						onChange={(e) => {
							setstate({ ...state, password: e.target.value });
						}}
					/> 
					</label>
				</div>
				<div className="float-right">
					<button type="submit" className="btn btn-primary">
						Guardar
					</button>
				</div>
			</form>
		</div>
	);
}
