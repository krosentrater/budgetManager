import { useContext } from 'react';
import { UserContext } from './context/UserProvider.js';
import { Routes, Route, Navigate } from 'react-dom';



function App() {

  const { token } = useContext(UserContext);
  const shouldRedirect = true;

  function requiredAuth({ children, redirectTo }){
    let isAuthenticated = token;
    return isAuthenticated ? children : <Navigate to = {redirectTo} />;
  };

  return (
    <>

    </>
  );
}

export default App;
