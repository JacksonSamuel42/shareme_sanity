import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import Protected from './components/protected'
import { AuthContextProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  )
}

export default App