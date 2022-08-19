import { useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();

    const navigateToSignup = () =>{
      navigate('/signup');
    }
  
    const navigateToLogin = () =>{
      navigate('/login');
    }
  
    const navigateToHome = () =>{
      navigate('/');
    }
  
    const navigateToAccount = () =>{
      navigate('/account');
    }
  
    
     return (
      <div className='NavBar'>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand" onClick={navigateToHome}>My Forum </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {localStorage.getItem("access_token") === null && 
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              
              <li className="nav-item">
                <a className="nav-link" onClick={navigateToLogin}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={navigateToSignup}>Sign-up</a>
              </li>
            </ul>
          </div>}
          {localStorage.getItem("access_token") !== null && 
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item" >
                <a className="nav-link accountLogged" onClick={navigateToAccount}>My account</a>
              </li> 
            </ul>
          </div>}
  
        </div>
      </nav>
      </div>
      );
}
export default NavBar;