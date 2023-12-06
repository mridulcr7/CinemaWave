import React from 'react'
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Browse from "./Components/Browse"
import { useAuthContext } from './hooks/useAuthContext'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Browse /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
