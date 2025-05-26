import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate  } from "react-router-dom";
import { login } from "../../repositories/user";

function Login() {

  const userEmail = "user@example.com";
  const navigate = useNavigate ()
  
    const [state, setstate] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const lowercaseEmail = state.email.toLowerCase();
      // Check if the email ends with "@ventas.com"
      if (lowercaseEmail.endsWith("@ventas.com")){
        sessionStorage.setItem('permiso', true);
        sessionStorage.setItem('ejecutivo',lowercaseEmail);
      }
      else if (lowercaseEmail.endsWith("@analizador.com")){
        sessionStorage.setItem('permiso', true);
        sessionStorage.setItem('analizador',lowercaseEmail);
      }
      else if (lowercaseEmail.endsWith("@supervisor.com")){
        sessionStorage.setItem('permiso', true);
        sessionStorage.setItem('supervisor',lowercaseEmail);
      }
      else{
        sessionStorage.setItem('permiso', false);
      }
      const response = await login(state);
    // Store the token in local storage or a secure place for future use
      alert(response);
    
      sessionStorage.setItem('authToken', JSON.stringify(response));
      console.log('Navigating to /home');
      navigate('/home');
      window.location.reload();
		} catch (error) {
			alert(error);
		}
  };

  return (
    <div className="container mt-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
      <h1>Login</h1>
      <form style={
          { 
            padding: 20,
            width: '60%',
            height: '200%',
            background: 'white',
            boxShadow: '0px 4px 10px 2px rgba(0, 0, 0, 0.10)',
            borderRadius: '49px',
            justifyContent: 'center',
            alignItems: 'center',
          } 
        }>
          <div className="row"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="form-group" >
              <label htmlFor="email" >
                <h5> Email</h5> 
                <input
                  type="text"
                  id="email"
                  value={state.email}
                  onChange={(e) => {
                    setstate({ ...state, email: e.target.value });
                  }}
                
                />
              </label>
            </div>
          </div>
          <div className="row"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="form-group" >
              <label htmlFor="password">
                <h5> Contraseña</h5>  
                <input
                  type="password"
                  id="password"
                  value={state.password}
                  onChange={(e) => {
                    setstate({ ...state, password: e.target.value });
                  }}
                  
                />
              </label>
            </div>
          </div>
          <div className="row"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant="primary" type="submit" onClick={handleLogin} 
        style={
          {
          background: '#87ceeb',
          color: '#2f4f4f',
           }}>
          Login
        </Button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  root: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginHorizontal: 2,
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#266797',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  input: {
    color: 'rgb(169, 27, 13)',
    textAlign: 'center',
  },
};
export default Login;