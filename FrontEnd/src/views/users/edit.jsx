import React, { useState } from "react";
import useSWR from "swr";

import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getUser } from "../../repositories/user";

export default function edit() {
	const history = useNavigate();
	const { id } = useParams();

	const { data, error } = useSWR(id, {
		fetcher: getUser,
		initialData: { nombre: '', email: '' },
		revalidateOnMount: true,
	});

	const [state, setstate] = useState(data);

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			await updateUser(data.id, state);
			history.push(`/users/${data.id}`);
		} catch (error) {
			alert("A ocurrido un error al actualizar");
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
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Contraseña</label>
					<input
						className="form-control"
						id="password"
						type="password"
						value={state.password}
						onChange={(e) => {
							setstate({ ...state, password: e.target.value });
						}}
						placeholder="Ingrese Contraseña"
					/>
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
