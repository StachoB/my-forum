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
  
   return (
    <div className='App'>
      
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

