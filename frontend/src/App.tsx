import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom"
import SignUpForm from './components/signupform';
import LogInForm from './components/loginform';
import Home from './components/home';
import PublicationForm from './components/publicationForm';
import React from 'react';
import Account from './components/account';
import CommentForm from './components/commentForm';

function App() {
  // const navigate = useNavigate();

  // const navigateToSignup = () =>{
  //   navigate('/signup');
  // }

  // const navigateToLogin = () =>{
  //   navigate('/login');
  // }

  // const navigateToHome = () =>{
  //   navigate('/');
  // }

  // const navigateToAccount = () =>{
  //   navigate('/account');
  // }

  // const [isUserAlreadyLogged, setIsUserAlreadyLogged] = React.useState(localStorage.getItem("access_token") != "")
  
   return (
    <div className='App'>
      
      {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <a className="navbar-brand" onClick={navigateToHome}>My Forum</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>{!isUserAlreadyLogged && 
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
        {isUserAlreadyLogged && 
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item" >
              <a className="nav-link accountLogged" onClick={navigateToAccount}>Account : barbara</a>
            </li> 
          </ul>
        </div>}

      </div> 
    </nav>*/}
     <Routes>
      <Route path= "/" element={<Home />} />
      <Route path= "/signup" element={<SignUpForm />} />
      <Route path= "/login" element={<LogInForm />} />
      <Route path= "/postPubli" element={<PublicationForm/>} />
      <Route path= "/postComment/:publiId" element={<CommentForm/>} />
      <Route path= "/account" element={<Account />} />
   </Routes> 
    </div>
  );
  
}

export default App;

