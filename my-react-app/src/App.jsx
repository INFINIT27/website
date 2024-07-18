import { Routes, Route, Navigate } from 'react-router-dom'
import Home from "./page/Home";
import Header from './components/Header';
import Profile from './page/Profile';
import SignUp from './page/SignUp';
import NotFound from './page/NotFound';
import Classes from './page/Classes';
import ProtectedRoute from './components/ProtectedRoute';
import { updateAuthentication } from './constants';
import { useEffect } from 'react';
import react from "react";

function Logout() {
  updateAuthentication(false);
  localStorage.clear();
  return <Navigate to="/profile"/>;
}

function RegisterAndLogout({Route}) {
  localStorage.clear();
  return <SignUp route={Route}/>;
}

function App() {

  useEffect(() => {
    document.title = "Classes and Notes Website";
  }, []);

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
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/profile' element={<Profile route="/api/token"/>}/>
          <Route path='/signup' element={<RegisterAndLogout Route="/api/user/register"/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </div>
  );
}

export default App
