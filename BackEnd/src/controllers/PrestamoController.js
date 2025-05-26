import { Prestamo } from '../models/prestamo.js';
import axios from "axios";
export default class PrestamoController {
    async mostrarPrestamos(req,res){
        try {
            const ejec = req.body.ejecutivo;

            const whereClause = ejec ? { where: { ejecutivo: ejec } } : {};

            const Prestamos = await Prestamo.findAll(whereClause);
            const seen = {};
            const uniqueUsers = [];
        
            for (const prestamo of Prestamos) {
                if (!seen[prestamo.ejecutivo]) {
                    seen[prestamo.ejecutivo] = true;
                    uniqueUsers.push(prestamo);
                }
            }
        
            console.log(uniqueUsers);
            res.send(uniqueUsers);
          } catch (error) {
            console.error("Error fetching simulations:", error);
            res.status(500).send("Internal Server Error");
          }
    }
    async getPrestamo(req,res){
        try {
            const correo = req.body.correo;
            console.log("correo")
            console.log(correo)
            const Prestamos = await Prestamo.findAll({
                where: {
                    correo: correo
                }
            });
            console.log(Prestamos[0])
            res.send(Prestamos);
          } catch (error) {
            console.error("Error fetching simulations:", error);
            res.status(500).send("Internal Server Error");
          }
    }
    async getPrestamodetallado(req,res){
        try {
            const correo = req.body.correo;
            const Prestamos = await Prestamo.findAll({
                where: {
                    correo: correo
                }
            });
            const enhancedPrestamos = await Promise.all(
                Prestamos.map(async (prestamo) => {
                  const { day, month, year } = prestamo;
          
                  const apiUrlDolar = `https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar/${year}/${month}/dias/${day}?apikey=6b1ec4648c7284775f574ec2cd76aef10e557997&formato=JSON`;
                  const apiUrlEuro = `https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/${year}/${month}/dias/${day}?apikey=6b1ec4648c7284775f574ec2cd76aef10e557997&formato=JSON`;
                  const apiUrlUtm = `https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/${year}/${month}?apikey=6b1ec4648c7284775f574ec2cd76aef10e557997&formato=JSON`;
          
                  try {
                    const [responseDolar, responseEuro, responseUtm] = await Promise.all([
                      axios.get(apiUrlDolar),
                      axios.get(apiUrlEuro),
                      axios.get(apiUrlUtm)
                    ]);
                    console.log("responseDolar");
                    console.log(responseUtm.data);
                    const VDfloat = parseFloat(responseDolar.data.Dolares[0].Valor.replace(/\./g, "").replace(",", "."));
                    const VEfloat = parseFloat(responseEuro.data.Euros[0].Valor.replace(/\./g, "").replace(",", "."));
                    const VUTMfloat = parseFloat(responseUtm.data.UTMs[0].Valor.replace(/\./g, "").replace(",", "."));
                    return {
                      ...prestamo.dataValues,
                      VDfloat,
                      VEfloat,
                      VUTMfloat
                    };
                  } catch (error) {
                    console.error(`Error fetching data for prestamo on ${day}-${month}-${year}:`, error);
                    throw new Error("Error fetching exchange rates");
                  }
                })
              );
          
              res.send(enhancedPrestamos);
          } catch (error) {
            console.error("Error fetching simulations:", error);
            res.status(500).send("Internal Server Error");
          }
    }
    async createPrestamos(req, res) {
        const year =  req.body.año;              // Replace with the desired year
        const month = req.body.mes;               // Replace with the desired month (1-12)
        const day = req.body.dia; 
        const numMes = req.body.numMes;
        const razon = req.body.razon;
        const valor = req.body.valor;
        const correo = req.body.correo;
        const nombre = req.body.nombre;
        const rut = req.body.rut;
        const ejec = req.body.ejecutivo;

        try {
            
            const prestamodata = await Prestamo.create({
                dia: day,
                mes: month,
                año: year,
                numMes: numMes,
                razon: razon,
                valor: valor,
                correo: correo,
                nombre: nombre,
                rut: rut,
                ejecutivo: ejec

            });

            res.send(prestamodata);
            } catch (error) {   
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    }
	async deletePrestamos(req, res) {
		await Prestamo.destroy({where: {id: req.params.prestId}});
		res.send({status: "ok"});
	}
};
