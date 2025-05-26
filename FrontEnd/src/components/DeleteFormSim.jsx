import React from "react";
import PropTypes from "prop-types"; // ES6
import { mutate } from 'swr';

export default function DeleteFormSym({ id, callback }) {
	const deleteSim = async (e) => {
		e.preventDefault();
		try {
			await callback(id);
			mutate(`${process.env.REACT_APP_BACKEND_URL}/sims`, newData, false);
			alert("Elemento recargado correctamente");
		} catch (error) {
			alert("A ocurrido un error al borrar el elemento");
		}
	};
	return (
		<form onSubmit={deleteSim} className="d-inline-block ml-4" action="">
			<input type="hidden" name="id" value={id} />
			<button onClick={deleteSim} className="btn btn-danger" type="submit">
				Borrar
			</button>
		</form>
	);
}
DeleteFormSym.propTypes = {
	id: PropTypes.number.isRequired,
	callback: PropTypes.func.isRequired,
};
