	import UserController from './UserController.js';
	import SimController from './SimController.js';
	import PrestamoController from './PrestamoController.js';
	export default (app) => {
		const userController = new UserController();
		const simController = new SimController();
		const prestamoControlle = new PrestamoController();
		app.get('/getusers', userController.getAll);
		app.post('/users', userController.create);
		app.get('/users/:userId', userController.get);
		app.put('/users/:userId', userController.update);
		app.delete('/users/:userId', userController.delete);
		app.post('/login', userController.login);
		app.get('/sims', simController.getAllSims);
		app.post('/getPrestamo',prestamoControlle.getPrestamo)
		
		app.post('/getPrestamodetallado',prestamoControlle.getPrestamodetallado)
		app.delete('/sims/:simId', simController.deleteSims);
		app.post('/CreateSims', simController.createSims);
		app.post('/createPrestamos', prestamoControlle.createPrestamos);
		app.post('/mostrarPrestamos', prestamoControlle.mostrarPrestamos);
		app.delete('/deletePrestamos/:prestId', prestamoControlle.deletePrestamos);
	};