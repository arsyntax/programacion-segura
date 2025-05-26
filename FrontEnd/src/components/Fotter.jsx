import "../views/css/Footer.css"

function Footer() {
    return (
      <div className="background" style={{ 
        color: 'darkslategrey',
        background: '#87ceeb',
        marginTop: 'auto',
        padding: '2%',
      }}>
        <div className="container" style={{ paddingLeft: '8%', paddingRight: '8%' }}>
          <div className="row">
            {/* Footer content */}
            <div className="col-lg-4">
              <h3>Enlaces</h3>
              <ul>
                <li><a href="">Inicio</a></li>
                <li><a href="#">Acerca de</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
  
            <div className="col-lg-4">
              <h3>Derechos de autor</h3>
              <p>(c) 2023 Mi Sitio Web. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Footer;