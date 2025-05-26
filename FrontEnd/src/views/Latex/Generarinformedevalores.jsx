import React, { useState, useEffect } from 'react';
import '../css/GenerarDoc.css';
import { saveAs } from 'file-saver'; 
import Table from "react-bootstrap/Table";
import Row from 'react-bootstrap/esm/Row';
import { getPrestamodetallado, getPrestamos, getPrestamo } from "../../repositories/user";

export default function GenerarDocdet() {
  const [estadoGeneracion, setEstadoGeneracion] = useState('');
  const [Correo, setCorreo] = useState('0');
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
    let prestamosDetallados = [];

    try {
      const response2 = await getPrestamodetallado({ correo: selectedUser.correo });
      prestamosDetallados = response2;
    } catch (error) {
      console.error('Error fetching data:', error);
      setEstadoGeneracion('Error al generar el documento.');
      return;
    }

    if (prestamosDetallados.length === 0) {
      alert('No se encontraron préstamos para este usuario.');
      setEstadoGeneracion('No se encontraron préstamos.');
      return;
    }

    const totalValor = prestamosDetallados.reduce((sum, prestamo) => sum + parseFloat(prestamo.valor), 0);
    const totalMeses = prestamosDetallados.reduce((sum, prestamo) => sum + parseInt(prestamo.numMes), 0);
    const promedioValor = totalValor / prestamosDetallados.length;

    const prestamosInfo = prestamosDetallados.map(prestamo => `
      Valor: ${prestamo.valor}
      Número de meses: ${prestamo.numMes}
      VDfloat: ${prestamo.VDfloat}
      VEfloat: ${prestamo.VEfloat}
      VUTMfloat: ${prestamo.VUTMfloat}
    `).join('\n\n');

    const template = `
      \\documentclass{article}
      \\title{Informe de financiera}
      \\author{Nro de peticion: ${selectedUser.peticion}}
      \\begin{document}
      \\maketitle
      \\section{Informacion del informe}
      Nombre de la persona: ${selectedUser.nombre}\\\\
      Numero de cuenta: ${selectedUser.id}\\\\
      Fecha de la persona: ${selectedUser.fecha}
      Informacion sensible: no\\\\
      \\section{Préstamos}
      Promedio de valor de los préstamos: ${promedioValor}\\\\
      Total de meses: ${totalMeses}\\\\
      \\subsection{Detalles de los préstamos}
      ${prestamosInfo}
      \\section{Comentarios}
      \\subsection{Comentarios de venta}
      aqui se va añadir informacion 
      \\subsection{Comentarios de analistas }
      aqui se va añadir informacion que corresponde alguna informacion que quiera dejar costancia al momento de enviar este informe y quede guardado en ese momento 
      \\end{document}
    `;

    const blob = new Blob([template], { type: 'application/x-latex' });
    saveAs(blob, `Informe_Financiera_${selectedUser.peticion}.tex`);

    setEstadoGeneracion('Documento generado y guardado.');
  };

  return (
    <>
      <Row className="no-gutters" style={{ minHeight: '100vh', width: '100%', paddingLeft: '5%', height: '100%', backgroundColor: 'aliceblue' }}>
        <form style={{ width: '40%' }}>
          <label htmlFor="peticion">Nombre del usuario:</label>
          <br />
          <select name="peticion" id="peticion" value={peticion} onChange={(e) => setPeticion(e.target.value)}>
            <option value="0">Seleccione un usuario</option>
            {datos.map(user => (
              <option key={user.correo} value={user.correo}>{user.correo}</option>
            ))}
          </select>
          <button type="button" onClick={generarDocumentoLaTeX}>Generar Documento</button>
        </form>

        <p>{estadoGeneracion}</p>
        {peticion !== '0' && Array.isArray(prestamos) && prestamos.length > 0 && (
          <div>
            <Table bordered>
              <thead style={{ backgroundColor: 'lightblue' }}>
                <tr>
                  <th>Valor</th>
                  <th>Número de meses</th>
                  <th>VDfloat</th>
                  <th>VEfloat</th>
                  <th>VUTMfloat</th>
                </tr>
              </thead>
              {prestamos.map(prestamo => (
                <tbody key={prestamo.id} style={{ backgroundColor: 'white' }}>
                  <tr>
                    <td>{prestamo.valor}</td>
                    <td>{prestamo.numMes}</td>
                    <td>{prestamo.VDfloat}</td>
                    <td>{prestamo.VEfloat}</td>
                    <td>{prestamo.VUTMfloat}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </div>
        )}
      </Row>
    </>
  );
}
