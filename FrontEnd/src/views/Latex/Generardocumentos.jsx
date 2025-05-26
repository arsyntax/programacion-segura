import React, { useState , useEffect} from 'react';
import '../css/GenerarDoc.css';
import { saveAs } from 'file-saver'; 
import Row from 'react-bootstrap/esm/Row';
import { getAllUsers } from "../../repositories/user";
/* 
const datos = [
  {
    nombre: 'Id',
    codigoCuenta: '----',
    fecha: '9-12-2023',
    peticion: '0',
    Nombre: "nada",
    Fecha: "06/05/2007",
    ValorUF: "90.000",
    Total: "b",
    Nro: "12",
    Interes: '6'
  },



  {
    nombre: 'Juan',
    codigoCuenta: '12345',
    fecha: '3-11-2023',
    peticion: '1',
    Nombre: "test",
    Fecha: "02/01/2003",
    ValorUF: "64.000",
    Total: "X",
    Nro: "123",
    Interes: '23'
  },
  {
    nombre: 'Ana',
    codigoCuenta: '54321',
    fecha: '5-12-2023',
    peticion: '3',
    Nombre: "caso dos",
    Fecha: "04/03/2005",
    ValorUF: "70.000",
    Total: "Z",
    Nro: "789",
    Interes: '40'
  },
  {
    nombre: 'Pedro',
    codigoCuenta: '98765',
    fecha: '7-12-2023',
    peticion: '4',
    Nombre: "caso tres",
    Fecha: "05/04/2006",
    ValorUF: "80.000",
    Total: "W",
    Nro: "1011",
    Interes: '50'
  },
  {
    nombre: 'Luis',
    codigoCuenta: '13579',
    fecha: '9-12-2023',
    peticion: '5',
    Nombre: "caso cuatro",
    Fecha: "06/05/2007",
    ValorUF: "90.000",
    Total: "V",
    Nro: "1213",
    Interes: '60'
  }
];
*/

export default function GenerarDoc() {
  const [estadoGeneracion, setEstadoGeneracion] = useState('');
  const [peticion1,setpeticion1] = useState('0');
  const [peticion2,setpeticion2] = useState('0');
  const [peticion3,setpeticion3] = useState('0');

  const [datos, setDatos] = useState([]);
  const [peticion, setPeticion] = useState('0');
  const [supervisorCorreo, setSupervisorCorreo] = useState('0');
  const [motivoDerivacion, setMotivoDerivacion] = useState('0');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      alert(JSON.stringify(response[0], null, 2));
      setDatos(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generarDocumentoLaTeX = async () => {
    if (peticion === '0' || supervisorCorreo === '0' || motivoDerivacion === '0') {
      alert('Por favor, seleccione todas las opciones.');
      return;
    }

    setEstadoGeneracion('Generando documento...');

    const selectedUser = datos.find(user => user.nombre === peticion);
    
    
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
      </form>      
      <form style={{ width: '80%' }}>
        
        <label htmlFor="peticion">Número de ID del usuario:</label>
        <br />
        <select name="peticion" id="peticion" value={peticion} onChange={(e) => setPeticion(e.target.value)}>
          <option value="0">Seleccione un usuario</option>
          {datos.map(user => (
            <option key={user.nombre} value={user.nombre}>{user.nombre}</option>
          ))}
        </select>
      </form>
      <form style={{ width: '80%', marginBottom: '1%' }}>
        <label htmlFor="motivoDerivacion">Indique motivo de derivación de solicitud:</label>
        <br />
        <select name="motivoDerivacion" id="motivoDerivacion" value={motivoDerivacion} onChange={(e) => setMotivoDerivacion(e.target.value)}>
          <option value="0">Seleccione un motivo</option>
          <option value="Antecedentes">1. Antecedentes</option>
          <option value="Motivos Externos">2. Motivos Externos</option>
          <option value="Problema">3. Problema de comprobación</option>
          <option value="Error indeseado">4. Error indeseado</option>
        </select>
        <br /><br /><br /><br />
        <button onClick={generarDocumentoLaTeX}>Generar Documento</button>
      </form>
      <p>{estadoGeneracion}</p>
    </Row>
    </>
  );
}


