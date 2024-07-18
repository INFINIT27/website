import {BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from "./page/Home";
import Materials from './page/Materials';
import Contact from './page/Contact';
import Header from './components/Header';
import Profile from './page/Profile';
import SignUp from './page/SignUp';
import Form from './page/Form'
import NotFound from './page/NotFound';
import LogIn from './page/LogIn';
import Register from './page/Register';
import Classes from './page/Classes';
import ProtectedRoute from './components/ProtectedRoute';
import react from "react"
import Test from './page/Classes';


let isSignedIn = false;

function Logout() {
  localStorage.clear();
  isSignedIn = false;
  return <Navigate to="/profile"/>;
}

function RegisterAndLogout({Route}) {
  localStorage.clear();
  return <SignUp route={Route}/>;
}

function App() {

  const navigate = useNavigate();

  return(
    <div>
      <Header/>
        <Routes>
          <Route path='/' element={
              <ProtectedRoute> {/* Can only be accessed when you are logged in */}
               <Home/>
              </ProtectedRoute>
          }
          />
          <Route path='/classes' element={
              <ProtectedRoute>
                <Classes/>
              </ProtectedRoute>
          }
          />
          <Route path='/materials' element={<Materials/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/contact' element={<Contact/>}/>
          
          <Route path='/profile' element={<Profile route="/api/token"/>}/>
          <Route path='/signup' element={<RegisterAndLogout Route="/api/user/register"/>}/>
          
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  );
}

export default App
