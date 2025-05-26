import axios from "axios";

const updateUser = async (id, data) =>
	axios
		.put(`${process.env.REACT_APP_BACKEND_URL}/users/${id}/edit`, data);

const createUser = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/users`, data);

const login = async (data) =>
	axios
		.post(`${process.env.REACT_APP_BACKEND_URL}/login`, data)
		.then((res) => res.data);
const deleteUser = async (id) =>
	axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`).then(res => res.data);

const getAllUsers = () =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/getusers`)
		.then((res) => res.data);
		
const getAllSims = () =>
	fetch(`${process.env.REACT_APP_BACKEND_URL}/GetAllSims`)
	.then((res) => res.data);

const getPrestamo = (data)=>
	axios
	.post(`${process.env.REACT_APP_BACKEND_URL}/getPrestamo`,data)
	.then((res) => res.data);

const getUser = (id) =>
	axios
		.get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`)
		.then((res) => res.data);
const CreateSims = (data)=>{
	axios
	.post(`${process.env.REACT_APP_BACKEND_URL}/CreateSims`,data)
	.then((res) => res.data);
}
const deleteSym = async (id) =>
	axios.delete(`${process.env.REACT_APP_BACKEND_URL}/sims/${id}`).then(res => res.data);

const createPrestamos = (data)=>
	axios
	.post(`${process.env.REACT_APP_BACKEND_URL}/createPrestamos`,data)
	.then((res) => res.data);

const deletePrestamos = async (id) =>
	axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletePrestamos/${id}`).then(res => res.data);
	
const getPrestamos = (data)=>
	axios
	.post(`${process.env.REACT_APP_BACKEND_URL}/mostrarPrestamos`,data)
	.then((res) => res.data);

const getPrestamodetallado = (data)=>
	axios
	.post(`${process.env.REACT_APP_BACKEND_URL}/getPrestamodetallado`,data)
	.then((res) => res.data);

// eslint-disable-nextline
export { deleteUser, updateUser, createUser, getAllUsers, getUser, login, CreateSims, getAllSims,deleteSym, createPrestamos, deletePrestamos , getPrestamos, getPrestamo, getPrestamodetallado};
