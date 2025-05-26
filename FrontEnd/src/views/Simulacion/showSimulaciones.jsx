import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import DeleteFormSym from "../../components/DeleteFormSim";
import { deleteSym, getAllSims } from "../../repositories/user";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Sidebar from "../../components/Sidebar";

export default function ShowSimulation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sims`);
          setData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching data:", error);

        }
      };

      fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts
  const deleteSim = async  (e, id) => {
    try {
      await deleteSym(id);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/sims`);
      const newData = response.data;
  
      // Update the data and trigger a re-render
      setData(newData);
      
      // Use the updated data with mutate
      alert("Elemento recargado correctamente");
    } catch (error) {
      alert("A ocurrido un error al borrar el elemento");
    }
  };
  return (
    <>
      <Row className="no-gutters" style= {{
            height: 'auto', 
            alignItems:'start', 
            minHeight: '100vh',
            backgroundColor: 'white',
            }}>
        <Col xs="10">
          <div className="container mt-4" style= {{
            height: 'auto', 
            alignItems:'start', 
            minHeight: '100vh',
            backgroundColor: 'white',
            }}>
            <Table   bordered > 
            <thead style={{backgroundColor: 'lightblue '}}>
            <tr>
            <th >ID Simulacion:</th>
                    <th>Dia:</th><th>Mes:</th><th>Año:</th><th>Tasa:</th><th>ValorUF:</th><th>Valor Total Credito:</th> <th></th></tr></thead>
                {error && <tr><td>Error loading data</td></tr>}
                {!error && !data && <tr><td>Loading...</td></tr>}
                {data && data.map((item) => (
              <React.Fragment key={item.id}>
                  
                  <tbody  style={{backgroundColor:'white'}}>  
                  <tr>
                  
                  <td>{item.id}</td>
                  
                  <td>{item.dia}</td>
                  
                  <td>{item.mes}</td>
                  
                  <td>{item.año}</td>
                  
                  <td>{item.taza}</td>
                  
                  <td>{item.valorUF}</td>
                  
                  <td>{item.valorcredito}</td>

                  <td >
                    <form onSubmit={(e) => deleteSim(e, item.id)} className="d-inline-block ml-4" action="">
                      <input type="hidden" name="id" value={item.id} />
                      <button className="btn btn-danger" type="submit">
                        Borrar
                      </button>
                    </form>
                  </td>
                </tr>
                </tbody>
                
            </React.Fragment>
            ))}
            </Table>


          </div>
      </Col>
    </Row> 
    </>
  );
}