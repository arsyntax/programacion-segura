import React, { useState , useEffect} from 'react';
import '../css/GenerarDoc.css';
import { saveAs } from 'file-saver'; 
import Table from "react-bootstrap/Table";
import Row from 'react-bootstrap/esm/Row';
import { getAllUsers,getPrestamos,getPrestamo } from "../../repositories/user";

export default function GenerarDocAn() {
  const [estadoGeneracion, setEstadoGeneracion] = useState('');
  const [Correo,setCorreo] = useState('0');


  const [datos, setDatos] = useState([]);
  const [peticion, setPeticion] = useState('0');
  const [prestamos, setPrestamos] = useState([]);
  const [motivoDerivacion, setMotivoDerivacion] = useState('0');

  useEffect(() => {
    const fetchPrestamosData = async () => {
      try {
        if (peticion !== '0') {
          const response2 = await getPrestamo({ correo: peticion });
          setPrestamos(response2);
        }
      } catch (error) {
        console.error('Error fetching prestamos data:', error);
      }
    };

    fetchPrestamosData();
  }, [peticion]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getPrestamos();
      setDatos(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generarDocumentoLaTeX = async () => {
    if (peticion === '0') {
      alert('Por favor, seleccione todas las opciones.');
      return;
    }

    setEstadoGeneracion('Generando documento...');

    const selectedUser = datos.find(user => user.correo === peticion);
    try {
        const response2 = await getPrestamo({ correo:selectedUser.email });
        prestamos = response2;
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
      if (prestamos.length === 0) {
        alert('No se encontraron préstamos para este usuario.');
        setEstadoGeneracion('No se encontraron préstamos.');
        return;
      }
    
      const totalValor = prestamos.reduce((sum, prestamo) => sum + parseFloat(prestamo.valor), 0)
      const totalMeses = prestamos.reduce((sum, prestamo) => sum + parseInt(prestamo.numMes), 0);
      const promedioValor = totalValor / prestamos.length;
      const template = `
      \\documentclass{article}
      \\title{Informe de financiera}
      \\author{Nro de peticion: ${selectedUser.peticion}}
      \\begin{document}
      \\maketitle
      \\section{Informacion del informe }
      Nombre de la persona: ${selectedUser.nombre}\\\\
      Numero de cuenta: ${selectedUser.id}\\\\
      Fecha de la persona: ${selectedUser.fecha}
      Informacion sensible: no\\\\
      \\section{Préstamos}
      Promedio de valor de los préstamos: ${promedioValor}\\\\
      Total de meses: ${totalMeses}\\\\
      \\section{Comentarios}
      \\subsection{Comentarios de venta}
      aqui se va añadir informacion 
      \\subsection{Comentarios de analistas }
      aqui se va añadir informacion que corresponde alguna informacion que quiera dejar costancia al momento de enviar este informe y quede guardado en ese momento 
      \\end{document}
    `;

    const blob = new Blob([template], { type: 'application/x-latex' });
    saveAs(blob, `Informe_Financiera_${selectedUser.peticion}.tex`);
     /* */
    setEstadoGeneracion('Documento generado y guardado.');
  };

  return (
    <>
      <Row className="no-gutters" style={{ minHeight: '100vh', width: '100%', paddingLeft: '5%', height: '100%', backgroundColor: 'aliceblue' }}>  
      {/* no parece necesario el correo del supervisor para los informes de un usuario
      <form style={{ width: '80%' }}>
        <h1 style={{ color: 'darkslategrey', paddingLeft: '20%', paddingBottom: '5%' }}>Generador de documentos LaTeX</h1>
        <label htmlFor="supervisorCorreo">Ingrese el correo del supervisor:</label>
        <br />
        <select name="supervisorCorreo" id="supervisorCorreo" value={supervisorCorreo} onChange={(e) => setSupervisorCorreo(e.target.value)}>
            <option value="0">Seleccione un supervisor</option>
          {datos
            .filter(user => user.email.includes('@ventas'))
              .map(user => (
              <option key={user.nombre} value={user.email}>{user.email}</option>
            ))}
        </select>
      </form>      */}
      <form style={{ width: '40%' }}>
        
        <label htmlFor="peticion">Nombre del usuario:</label>
        <br />
        <select name="peticion" id="peticion" value={peticion} onChange={(e) => setPeticion(e.target.value)}>
          <option value="0">Seleccione un usuario</option>
          {datos.map(user => (
            <option key={user.correo} value={user.correo}>{user.correo}</option>
          ))}
        </select> 
        <button onClick={generarDocumentoLaTeX}>Generar Documento</button>
      </form>
       
      <p>{estadoGeneracion}</p>
      {peticion !== '0' && Array.isArray(prestamos) && prestamos.length > 0 && (
        <div>
          
          <Table   bordered > 
            <thead style={{backgroundColor: 'lightblue '}}>
                  <tr>
                    <th>Valor: </th>
                    <th>numMes:</th>
                     </tr>
                     </thead>
                {prestamos && prestamos.map((prestamos) => (
              <React.Fragment key={prestamos.id}>
                  
                  <tbody  style={{backgroundColor:'white'}}>  
                  <tr>
                  
                  <td> {prestamos.valor}</td>
                  
                  <td>{prestamos.numMes}</td>
                  
                </tr>
                </tbody>
                
            </React.Fragment>
            ))}
            </Table>
        </div>
      )}
    </Row>
    
    </>
    
  );
}


