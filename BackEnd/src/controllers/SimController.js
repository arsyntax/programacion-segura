import { Simulaciones } from '../models/Simulacion.js';
import sequelize from '../database.js';
import axios from "axios";

const transaction = sequelize.transaction();

export default class SimController {
	async getAllSims(req, res) {
		try {
            const simulaciones = await Simulaciones.findAll();
            res.send(simulaciones);
          } catch (error) {
            console.error("Error fetching simulations:", error);
            res.status(500).send("Internal Server Error");
          }
	}

    async createSims(req, res) {
        const year =  req.body.year;
        const month = req.body.month;
        const day = req.body.day; 
    
        const tasa = req.body.taza;
        const plazo = req.body.plazo;
        const valorcredito = req.body.valorcredito;
        const apiUrl = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}?apikey=6b1ec4648c7284775f574ec2cd76aef10e557997&formato=JSON`;
    
        try {
            const response = await axios.get(apiUrl);
            const ufstring = response.data;
            const valorUF = ufstring.UFs[0].Valor.replace(/\./g, "");
            const ufValueFloat = parseFloat(valorUF);
            
            const CuotaENUF = valorcredito / ((1 - Math.pow(tasa + 1, -plazo)) / tasa);
            const valortotal = valorcredito * ufValueFloat + CuotaENUF * plazo;

            try {
            const simulacion = await Simulaciones.create({
                dia: day,
                mes: month,
                año: year,
                taza: tasa,
                plazo: plazo,
                valorcredito: valortotal,
                valorUF: ufValueFloat,
            }, /*{ transaction }*/);
            console.log(simulacion)
            res.send(simulacion);
            } catch (error) {  
                console.log(error);
                res.status(500).send({ error: "Internal Server Error" }); 
            }
        } catch (error) {  
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" }); 
        }
    }
	async deleteSims(req, res) {
        console.log("HOLA SOY UN SUPER TEXTO",req.params)
		await Simulaciones.destroy({where: {id: req.params.simId}});
		res.send({status: "ok"});
	}
};
